# Hacker News Tech Feed

Applicazione web sviluppata in React (Vite) per l'aggregazione di notizie tech da Hacker News. Il progetto consuma la REST API pubblica di [Hacker News](https://hacker-news.firebaseio.com/v0/) per recuperare articoli top, thread commenti e profili utente.

## Architettura e Struttura Directory

Il progetto adotta un approccio a componenti basato su React Router, strutturando il codice in base al principio di *Separation of Concerns* per disaccoppiare strato dati, componenti riusabili e pagine.

```text
├── app/                     # Sorgente dell'applicazione React
│   ├── App.jsx               # Root component e definizione delle route
│   ├── App.css                # Foglio di stile globale
│   ├── main.jsx               # Entry point (mount React + Router)
│   ├── components/           # UI riusabili (card storie, commenti, tabelle, header/footer)
│   ├── pages/                 # Componenti pagina (una per ogni route)
│   └── scripts/               # Data access layer (wrapper Fetch API, persistenza localStorage)
├── index.html
├── package.json
├── LICENSE
└── README.md
```

## Funzionalità Core

* **Top Stories Feed (`pages/TopStories.jsx`, `scripts/api.js`):** Fetching concorrente di storie top da Hacker News con rendering dinamico di card informative.
* **Thread e Commenti (`pages/Thread.jsx`, `components/CommentThread.jsx`):** Visualizzazione ricorsiva dell'albero commenti con lazy loading per rami profondi e handling di utenti eliminati.
* **Profilo Utente (`pages/Profile.jsx`):** Recupero dati profilo e ultime attività utente tramite parametrizzazione dell'ID da query string.
* **Read It Later (`pages/ReadLater.jsx`, `scripts/storage.js`):** Persistenza client-side degli ID articolo via `localStorage` con re-idratazione asincrona al caricamento.
* **Dynamic UI (`components/StoryCard.jsx`, `components/RecordsTable.jsx`):** Rendering dichiarativo tramite stato React e gestione degli stati loading/empty/error durante il caricamento dei dati.

## Setup ed Esecuzione

Il progetto è un'app React costruita con Vite. Per avviarla in locale:

```bash
npm install
npm run dev
```

A quel punto l'applicazione sarà accessibile all'indirizzo indicato nel terminale (tipicamente `http://localhost:5173`) e potete esplorare il feed di storie top, navigare tra thread e commenti, consultare profili utente e gestire la lista personale di articoli da leggere.

# Esercizi da Svolgere

Gli esercizi totali sono suddivisi in 3 macro-aree di intervento, ognuna con un peso specifico in termini di punteggio finale.
I primi due avranno anche dei commenti `TODO` all'interno del codice per guidarvi nei punti esatti in cui intervenire.
Il terzo esercizio richiede invece un'attività di debugging logico, per cui dovrete esplorare autonomamente i file per trovare e risolvere il problema.

Nel caso può essere utile, usare il numero storia: `48195009` per testare le funzionalità di recupero dati e visualizzazione. Poi per vedere la pagina Profilo, cliccare sull'autore `andreww591` così da essere reindirizzati alla pagina `/profile?user=andreww591` e verificare che i dati siano corretti.

### 1. INTEGRAZIONI DATI (60p)

**Obiettivo:** Ripristinare il sistema di recupero e visualizzazione delle storie nella pagina principale. Il sito per ora da errore o mostra dati incompleti.

**Task richiesti:**

1. **Data Fetching in [app/scripts/api.js](app/scripts/api.js)**\
   Completa la logica della funzione `getTopStoryIds` per effettuare una fetch all'endpoint corretto. Dovrai gestire correttamente la risposta, trasformare eventualemte i dati ricevuti e implementare una gestione degli errori corretta.

2. **Data Binding & UI Rendering in [app/components/StoryCard.jsx](app/components/StoryCard.jsx)**\
   Una volta recuperati i dati, completa il markup JSX del componente `StoryCard` per popolare correttamente la card di ogni storia. Assicurati che tutte le informazioni richieste (titolo, autore, ID, meta info e link) siano visualizzate in modo chiaro e ordinato.

### 2. CORREZIONE LAYOUT (30p)

**Obiettivo:** Ripristinare la visualizzazione di alcune sezioni del sito che presentano anomalie strutturali ed estetiche.

**Task richiesti:**

1. **Classe mancante in [app/pages/Thread.jsx](app/pages/Thread.jsx)**\
   Nel form di input per caricare un thread, manca una classe che impedisce al campo di input di essere visualizzato correttamente. Individua la classe corretta da aggiungere e applicala al div che contiene l'input e il bottone, così da rendere più funzionale il form.

2. **Stili CSS in [app/App.css](app/App.css)**\
   Completa le regole CSS per gli stati `hover` e `active` dei link di navigazione. Assicurati che i link reagiscano visivamente al passaggio del mouse e quando sono attivi, migliorando l'usabilità e l'estetica del sito.

3. **CSS per la tabella dei record [app/App.css](app/App.css)**\
   Completa le regole CSS per la tabella dei record della pagina Profilo, aggiungendo padding alle celle e mettendo a posto il testo sia verticalmente che orizzontalmente. Questo migliorerà la leggibilità e l'aspetto generale della tabella.

### 3. DEBUGGING LOGICO (10p)

**Obiettivo:** Individuare e risolvere un'anomalia logica del codice che impedisce il corretto funzionamento di una funzionalità del sito.

**Problema riscontrato:** Nella pagina Profilo, nonostante si inserisca un nome utente valido nella query string (es. `Magnanten`) e nonostante la funzione `getUserById` restituisca correttamente i dati dell'utente, la pagina mostra sempre e solo le informazioni di `andreww591`.

**Task richiesti:**
1. Esamina il codice in [app/scripts/api.js](app/scripts/api.js) e comprendi da dove nasce il problema, identificando la causa logica che impedisce il corretto funzionamento della pagina Profilo con utenti diversi da `andreww591`.
2. Trova la linea di codice che causa questo comportamento e correggila, così da permettere alla pagina di mostrare correttamente i dati dell'utente specificato nella query string.
