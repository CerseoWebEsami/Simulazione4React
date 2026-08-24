import { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard.jsx';
import { EmptyState, ErrorState, Loading } from '../components/AsyncState.jsx';
import { getTopStoriesDetailed } from '../scripts/api.js';
import { getReadLaterIds, toggleReadLater } from '../scripts/storage.js';
import { useAsyncSection } from '../scripts/useAsyncSection.js';

const BATCH_SIZE = 20;

/**
 * Pagina Top Stories: feed principale con fetch concorrenti a batch.
 *
 * @returns {React.JSX.Element} - Componente TopStories.
 */
function TopStories() {
  const [limit, setLimit] = useState(40);
  const [savedIds, setSavedIds] = useState(() => new Set(getReadLaterIds()));
  const { status, data: stories, error, run } = useAsyncSection({
    isEmpty: (items) => !Array.isArray(items) || items.length === 0,
  });

  const loadTopStories = () => {
    run(() => getTopStoriesDetailed({ total: limit, batchSize: BATCH_SIZE }));
  };

  useEffect(() => {
    loadTopStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const handleToggleSave = (story) => {
    toggleReadLater(story.id);
    setSavedIds(new Set(getReadLaterIds()));
  };

  return (
    <main className="main-content">
      <section className="panel page-section">
        <h2>Top Stories</h2>
        <p className="section-description">
          Fetch concorrente su topstories con carico progressivo in blocchi fissi.
        </p>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="limit-select">Elementi totali</label>
            <select
              id="limit-select"
              value={limit}
              onChange={(event) => setLimit(Number(event.target.value))}
            >
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
            </select>
          </div>
          <div className="form-group form-actions">
            <button id="btn-refresh" type="button" className="btn btn-primary" onClick={loadTopStories}>
              Ricarica feed
            </button>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div id="stories-feed" className="cards-grid">
          {status === 'loading' ? <Loading message="Caricamento top stories..." /> : null}
          {status === 'error' ? (
            <ErrorState title="Errore nel caricamento" message={error?.message || 'Operazione non riuscita'} />
          ) : null}
          {status === 'empty' ? <EmptyState message="Nessuna top story disponibile." /> : null}
          {status === 'success'
            ? stories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  showActions
                  showThreadButton={false}
                  feedVariant="top-stories"
                  isSaved={savedIds.has(story.id)}
                  onToggleSave={handleToggleSave}
                />
              ))
            : null}
        </div>
      </section>
    </main>
  );
}

export default TopStories;
