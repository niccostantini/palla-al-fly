import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Informativa sulla Privacy</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <p className="mb-4">
              In conformità al Regolamento UE 2016/679 (GDPR) e alla normativa italiana in materia di 
              protezione dei dati personali, la presente informativa descrive come raccogliamo, utilizziamo 
              e proteggiamo i tuoi dati personali.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Titolare del trattamento</h2>
            <p>
              Il titolare del trattamento dei dati è l'organizzatore della piattaforma Palla al Fly. 
              Per richieste relative alla privacy, è possibile contattare l'amministratore attraverso 
              il sito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Dati raccolti</h2>
            <p className="mb-3">
              Quando utilizzi Palla al Fly, raccogliamo le seguenti categorie di dati personali:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Dati di autenticazione:</strong> indirizzo email (necessario per la 
                registrazione e l'accesso al servizio)
              </li>
              <li>
                <strong>Dati di partecipazione:</strong> nome, cognome, numero di telefono e ruolo 
                (quando ti iscrivi a una partita)
              </li>
              <li>
                <strong>Dati di utilizzo:</strong> informazioni sulle partite a cui partecipi e 
                sulle tue preferenze
              </li>
              <li>
                <strong>Dati tecnici:</strong> cookie tecnici necessari per il funzionamento del 
                sito e per mantenere la tua sessione di accesso
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Base giuridica e finalità del trattamento</h2>
            <p className="mb-3">I tuoi dati sono trattati sulla base di:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Esecuzione del contratto (Art. 6.1.b GDPR):</strong> per permetterti di 
                utilizzare il servizio, organizzare partite e gestire le iscrizioni
              </li>
              <li>
                <strong>Consenso (Art. 6.1.a GDPR):</strong> per l'uso di cookie non essenziali 
                (se implementati in futuro)
              </li>
              <li>
                <strong>Legittimo interesse (Art. 6.1.f GDPR):</strong> per migliorare il servizio 
                e garantirne la sicurezza
              </li>
            </ul>
            <p className="mt-3">
              I dati sono trattati per le seguenti finalità:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Gestione dell'account e autenticazione</li>
              <li>Organizzazione di partite di pallavolo e gestione dei roster</li>
              <li>Comunicazione con gli altri partecipanti</li>
              <li>Invio di notifiche relative alle partite a cui sei iscritto</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Condivisione dei dati</h2>
            <p className="mb-3">
              Il tuo nome e numero di telefono sono visibili agli altri utenti autenticati quando 
              ti iscrivi a una partita, al fine di facilitare l'organizzazione e la comunicazione 
              tra i partecipanti.
            </p>
            <p className="mb-3">
              I tuoi dati possono essere condivisi con:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Supabase:</strong> fornitore di servizi di autenticazione e database, che 
                agisce come responsabile del trattamento. Maggiori informazioni nella{' '}
                <a 
                  href="https://supabase.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  privacy policy di Supabase
                </a>
              </li>
              <li>
                <strong>Google OAuth:</strong> se scegli di autenticarti tramite Google, verranno 
                applicati i termini di servizio di Google
              </li>
            </ul>
            <p className="mt-3">
              Non vendiamo né cediamo i tuoi dati personali a terze parti per finalità di marketing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Conservazione dei dati</h2>
            <p>
              I tuoi dati personali sono conservati per il tempo necessario a fornire il servizio e 
              fino a quando mantieni il tuo account attivo. I dati relativi alle partite passate 
              possono essere conservati per finalità storiche e statistiche. Puoi richiedere la 
              cancellazione del tuo account e dei tuoi dati in qualsiasi momento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Sicurezza dei dati</h2>
            <p>
              Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere 
              i tuoi dati personali da accessi non autorizzati, alterazioni, divulgazioni o 
              distruzioni. I dati sono memorizzati in modo sicuro utilizzando pratiche conformi agli 
              standard del settore, inclusa la crittografia delle comunicazioni tramite HTTPS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. I tuoi diritti (GDPR)</h2>
            <p className="mb-3">
              In conformità al GDPR, hai i seguenti diritti riguardo ai tuoi dati personali:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Diritto di accesso (Art. 15):</strong> puoi richiedere una copia dei tuoi 
                dati personali
              </li>
              <li>
                <strong>Diritto di rettifica (Art. 16):</strong> puoi aggiornare o correggere i 
                tuoi dati
              </li>
              <li>
                <strong>Diritto alla cancellazione (Art. 17):</strong> puoi richiedere la 
                cancellazione del tuo account e dei tuoi dati
              </li>
              <li>
                <strong>Diritto di limitazione (Art. 18):</strong> puoi richiedere la limitazione 
                del trattamento dei tuoi dati
              </li>
              <li>
                <strong>Diritto alla portabilità (Art. 20):</strong> puoi richiedere di ricevere i 
                tuoi dati in un formato strutturato e leggibile
              </li>
              <li>
                <strong>Diritto di opposizione (Art. 21):</strong> puoi opporti al trattamento dei 
                tuoi dati in determinate circostanze
              </li>
              <li>
                <strong>Diritto di revocare il consenso:</strong> dove il trattamento è basato sul 
                consenso, puoi revocarlo in qualsiasi momento
              </li>
            </ul>
            <p className="mt-3">
              Per esercitare questi diritti, contatta l'amministratore del sito. Hai inoltre il 
              diritto di presentare un reclamo all'Autorità Garante per la protezione dei dati 
              personali.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Trasferimento dati extra-UE</h2>
            <p>
              I dati potrebbero essere trasferiti e conservati su server situati al di fuori dello 
              Spazio Economico Europeo. In tal caso, garantiamo che vengano adottate misure adeguate 
              per proteggere i tuoi dati in conformità al GDPR, inclusi meccanismi di trasferimento 
              approvati come le Clausole Contrattuali Standard.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Cookie</h2>
            <p>
              Per informazioni dettagliate sui cookie utilizzati dal sito, consulta la nostra{' '}
              <a href="/cookie-policy" className="text-blue-600 hover:underline">
                Cookie Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Modifiche a questa informativa</h2>
            <p>
              Potremmo aggiornare questa informativa periodicamente per riflettere modifiche al 
              servizio o alla normativa. Ti consigliamo di consultare regolarmente questa pagina. 
              Le modifiche sostanziali ti saranno comunicate attraverso il sito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contatti</h2>
            <p>
              Per qualsiasi domanda, richiesta o reclamo relativo alla privacy e al trattamento dei 
              tuoi dati personali, contatta l'amministratore del sito.
            </p>
          </section>

          <section className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-600">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
