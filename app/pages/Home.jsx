import { Link } from 'react-router';

/**
 * Home page dell'app.
 *
 * @returns {React.JSX.Element} - Componente Home.
 */
function Home() {
  return (
    <main className="main-content">
      <section className="hero page-section">
        <h2>HN Tech Feed</h2>
        <p>
          Aggregatore news tech basato su Hacker News API: feed top stories, thread ricorsivi,
          profili utente e lista read-it-later persistente.
        </p>
        <div className="quick-links">
          <Link className="btn btn-primary" to="/top-stories">
            Apri Top Stories
          </Link>
          <Link className="btn btn-secondary" to="/read-later">
            Vai a Read-it-Later
          </Link>
        </div>
      </section>

      <section className="page-section">
        <h3>Come funziona</h3>
        <div className="guide-grid">
          <article className="guide-card">
            <h4>1. Feed concorrente</h4>
            <p>Batch Promise.all su /item/{'{id}'}.json per caricare rapidamente le top stories.</p>
          </article>
          <article className="guide-card">
            <h4>2. Thread ricorsivo</h4>
            <p>Traversing ad albero dei commenti via kids con espansione lazy dei rami.</p>
          </article>
          <article className="guide-card">
            <h4>3. Profili utente</h4>
            <p>Dati da /user/{'{id}'}.json e timeline delle ultime attivita da submitted.</p>
          </article>
          <article className="guide-card">
            <h4>4. Read-it-Later</h4>
            <p>Persistenza client-side degli ID articolo e re-idratazione async al mount.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;
