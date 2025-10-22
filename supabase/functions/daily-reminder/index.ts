import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Match {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: {
    name: string;
    address: string;
  };
}

interface Player {
  id: string;
  match_id: string;
  name: string;
  created_by: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get environment variables (without SUPABASE_ prefix)
    const supabaseUrl = Deno.env.get('PROJECT_URL')!;
    const supabaseServiceKey = Deno.env.get('SERVICE_ROLE_KEY')!;
    const oneSignalAppId = Deno.env.get('ONESIGNAL_APP_ID')!;
    const oneSignalApiKey = Deno.env.get('ONESIGNAL_API_KEY')!;

    if (!supabaseUrl || !supabaseServiceKey || !oneSignalAppId || !oneSignalApiKey) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get today's date in Europe/Rome timezone
    const today = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Europe/Rome',
    });

    // Fetch matches for today
    const { data: matches, error: matchesError } = await supabase
      .from('matches')
      .select('id, title, date, time, venue:venues(name, address)')
      .eq('date', today)
      .neq('status', 'cancelled');

    if (matchesError) throw matchesError;

    if (!matches || matches.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No matches today', count: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For each match, get players and send notifications
    const notificationPromises = matches.map(async (match: Match) => {
      const { data: players, error: playersError } = await supabase
        .from('players')
        .select('id, match_id, name, created_by')
        .eq('match_id', match.id);

      if (playersError || !players || players.length === 0) {
        return null;
      }

      // Get unique user emails
      const userEmails = [...new Set(players.map((p: Player) => p.created_by))];

      // Send OneSignal notification
      const notification = {
        app_id: oneSignalAppId,
        include_external_user_ids: userEmails,
        headings: { en: `Match Today: ${match.title}` },
        contents: {
          en: `Your match at ${match.venue.name} is today at ${match.time.slice(0, 5)}!`,
        },
        data: {
          match_id: match.id,
          type: 'daily_reminder',
        },
      };

      const response = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${oneSignalApiKey}`,
        },
        body: JSON.stringify(notification),
      });

      return response.json();
    });

    const results = await Promise.all(notificationPromises);
    const successCount = results.filter((r) => r !== null).length;

    return new Response(
      JSON.stringify({
        message: `Sent reminders for ${successCount} matches`,
        matchesCount: matches.length,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
