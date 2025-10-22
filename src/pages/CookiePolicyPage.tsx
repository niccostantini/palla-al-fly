import React from 'react';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-3">Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando 
              visiti un sito web. Vengono utilizzati per far funzionare il sito in modo efficiente e 
              per fornire informazioni ai proprietari del sito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Come utilizziamo i cookie</h2>
            <p className="mb-3">
              Questo sito utilizza cookie per le seguenti finalità:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Cookie tecnici essenziali:</strong> Necessari per il funzionamento del sito 
                e per permetterti di navigare e utilizzare le funzionalità. Includono cookie per 
                l'autenticazione e la gestione delle preferenze.
              </li>
              <li>
                <strong>Cookie di preferenze:</strong> Permettono al sito di ricordare le tue scelte 
                (come il consenso ai cookie) per migliorare la tua esperienza.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Cookie utilizzati</h2>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium">cookie-consent</p>
                <p className="text-sm text-gray-600">
                  Memorizza la tua preferenza riguardo l'uso dei cookie. Durata: permanente.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium">Cookie di autenticazione Supabase</p>
                <p className="text-sm text-gray-600">
                  Utilizzati per gestire la tua sessione di accesso quando sei autenticato. 
                  Durata: sessione/permanente a seconda delle tue preferenze di login.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Gestione dei cookie</h2>
            <p className="mb-3">
              Puoi controllare e/o eliminare i cookie come desideri. Puoi eliminare tutti i cookie 
              già presenti sul tuo computer e puoi impostare la maggior parte dei browser per 
              impedire che vengano memorizzati.
            </p>
            <p className="mb-3">
              Tuttavia, se lo fai, potresti dover regolare manualmente alcune preferenze ogni volta 
              che visiti il sito e alcune funzionalità potrebbero non funzionare.
            </p>
            <p>
              Per gestire i cookie nel tuo browser:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Chrome: Impostazioni → Privacy e sicurezza → Cookie</li>
              <li>Firefox: Impostazioni → Privacy e sicurezza → Cookie e dati dei siti</li>
              <li>Safari: Preferenze → Privacy → Gestisci dati siti web</li>
              <li>Edge: Impostazioni → Cookie e autorizzazioni sito → Cookie</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Cookie di terze parti</h2>
            <p>
              Questo sito utilizza Supabase per l'autenticazione e la gestione del database. 
              Supabase può impostare cookie per fornire i suoi servizi. Per maggiori informazioni, 
              consulta la{' '}
              <a 
                href="https://supabase.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                privacy policy di Supabase
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Aggiornamenti a questa policy</h2>
            <p>
              Potremmo aggiornare questa Cookie Policy periodicamente. Ti consigliamo di controllare 
              questa pagina regolarmente per eventuali modifiche.
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
