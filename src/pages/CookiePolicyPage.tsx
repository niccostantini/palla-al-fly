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
            <p className="mb-3">
              Di seguito trovi l'elenco dettagliato dei cookie utilizzati dal nostro sito:
            </p>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium text-gray-900">cookie-consent</p>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p><strong>Tipo:</strong> Cookie tecnico di preferenze</p>
                  <p><strong>Finalità:</strong> Memorizza la tua preferenza riguardo l'uso dei cookie</p>
                  <p><strong>Durata:</strong> Permanente (fino alla cancellazione manuale)</p>
                  <p><strong>Dominio:</strong> Prima parte</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium text-gray-900">sb-access-token / sb-refresh-token</p>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p><strong>Tipo:</strong> Cookie tecnico essenziale</p>
                  <p><strong>Finalità:</strong> Gestiscono la tua sessione di accesso e l'autenticazione tramite Supabase</p>
                  <p><strong>Durata:</strong> Sessione o permanente (in base alle tue preferenze di login)</p>
                  <p><strong>Dominio:</strong> Prima parte / Supabase</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium text-gray-900">Theme preference</p>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p><strong>Tipo:</strong> Cookie tecnico di preferenze (localStorage)</p>
                  <p><strong>Finalità:</strong> Memorizza la tua preferenza per il tema chiaro/scuro</p>
                  <p><strong>Durata:</strong> Permanente (fino alla cancellazione manuale)</p>
                  <p><strong>Dominio:</strong> Prima parte</p>
                </div>
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
            <p className="mb-3">
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
            <p>
              Se utilizzi l'autenticazione tramite Google, anche Google può impostare i propri cookie 
              secondo la loro privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Base giuridica e GDPR</h2>
            <p className="mb-3">
              In conformità al Regolamento UE 2016/679 (GDPR):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Cookie tecnici essenziali:</strong> non richiedono il tuo consenso preventivo 
                in quanto strettamente necessari per il funzionamento del sito (Art. 122 Codice Privacy).
              </li>
              <li>
                <strong>Cookie di preferenze:</strong> richiedono il tuo consenso, che puoi fornire 
                tramite il banner che appare alla prima visita del sito.
              </li>
            </ul>
            <p className="mt-3">
              Puoi modificare o revocare il tuo consenso in qualsiasi momento eliminando i cookie dal 
              tuo browser. Per maggiori informazioni sui tuoi diritti, consulta la nostra{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Informativa sulla Privacy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Aggiornamenti a questa policy</h2>
            <p>
              Potremmo aggiornare questa Cookie Policy periodicamente per riflettere modifiche 
              tecnologiche o normative. Ti consigliamo di controllare questa pagina regolarmente 
              per eventuali modifiche.
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
