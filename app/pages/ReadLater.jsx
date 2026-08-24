import { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard.jsx';
import { EmptyState, ErrorState, Loading } from '../components/AsyncState.jsx';
import { getItemsByIds } from '../scripts/api.js';
import { clearReadLater, getReadLaterIds, isReadLater, toggleReadLater } from '../scripts/storage.js';

/**
 * Pagina Read-it-Later: re-idratazione asincrona degli articoli salvati.
 *
 * @returns {React.JSX.Element} - Componente ReadLater.
 */
function ReadLater() {
  const [status, setStatus] = useState('idle');
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);

  const hydrateReadLater = async () => {
    const ids = getReadLaterIds();

    if (ids.length === 0) {
      setStatus('empty');
      return;
    }

    setStatus('loading');

    try {
      const items = await getItemsByIds(ids);
      const filtered = items.filter((item) => item && (item.type === 'story' || item.type === 'job'));

      if (filtered.length === 0) {
        setStatus('empty-filtered');
        return;
      }

      setStories(filtered);
      setStatus('success');
    } catch (loadError) {
      setStatus('error');
      setError(loadError);
    }
  };

  useEffect(() => {
    hydrateReadLater();
  }, []);

  const handleToggleSave = (story) => {
    toggleReadLater(story.id);
    hydrateReadLater();
  };

  const handleClearAll = () => {
    const confirmed = confirm('Vuoi rimuovere tutti gli articoli salvati?');

    if (confirmed) {
      clearReadLater();
      hydrateReadLater();
    }
  };

  return (
    <main className="main-content">
      <section className="panel page-section read-later-panel">
        <h2>Read-it-Later</h2>
        <p className="section-description">
          Articoli salvati in locale come ID, re-idratati in modo asincrono al caricamento pagina.
        </p>
        <div id="read-later-controls" className="records-panel read-later-controls">
          <div className="records-header records-header--stacked read-later-actions">
            <button type="button" className="btn btn-danger" id="btn-clear-all" onClick={handleClearAll}>
              Svuota lista
            </button>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div id="read-later-feed" className="cards-grid">
          {status === 'loading' ? <Loading message="Re-idratazione articoli salvati..." /> : null}
          {status === 'empty' ? (
            <EmptyState message="Nessun articolo salvato in read-it-later." />
          ) : null}
          {status === 'empty-filtered' ? (
            <EmptyState message="Gli ID salvati non hanno restituito articoli validi." />
          ) : null}
          {status === 'error' ? (
            <ErrorState title="Errore" message={error?.message || 'Impossibile recuperare la lista salvata.'} />
          ) : null}
          {status === 'success'
            ? stories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  showActions
                  showThreadButton
                  feedVariant="read-later"
                  isSaved={isReadLater(story.id)}
                  onToggleSave={handleToggleSave}
                />
              ))
            : null}
        </div>
      </section>
    </main>
  );
}

export default ReadLater;
