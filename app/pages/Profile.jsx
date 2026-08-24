import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import RecordsTable from '../components/RecordsTable.jsx';
import { EmptyState, ErrorState, Loading } from '../components/AsyncState.jsx';
import { getUserSubmittedItems } from '../scripts/api.js';
import { stripHtml } from '../scripts/sanitize.js';

/**
 * Card del profilo utente.
 *
 * @param {object} props - Props del componente
 * @param {object} props.user - Oggetto utente ottenuto dall'API
 * @returns {React.JSX.Element} - Componente ProfileCard.
 */
function ProfileCard({ user }) {
  return (
    <article className="user-profile-card">
      <h3>{user.id}</h3>
      <p className="user-meta">
        <strong>Karma:</strong> {user.karma}
      </p>
      <p className="user-meta">
        <strong>Creato il:</strong> {user.createdLabel}
      </p>
      {user.about ? <p>{stripHtml(user.about)}</p> : null}
    </article>
  );
}

const ACTIVITY_COLUMNS = [
  { header: 'ID', render: (item) => item.id },
  { header: 'Tipo', render: (item) => item.type },
  {
    header: 'Titolo/Testo',
    render: (item) => {
      const titleText = stripHtml(item.title || '').trim();
      const textSnippet = stripHtml(item.text || '').trim();
      const fallback = titleText || textSnippet || (item.url ? item.url : '');
      return fallback ? fallback.slice(0, 90) : 'N/D';
    },
  },
  { header: 'Autore', render: (item) => item.by },
  { header: 'Data', render: (item) => item.timeLabel },
];

/**
 * Pagina Profilo Utente: metriche utente e ultime attività da submitted.
 *
 * @returns {React.JSX.Element} - Componente Profile.
 */
function Profile() {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState('idle');
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const loadProfile = async (userId) => {
    const trimmedId = (userId || '').trim();

    if (!trimmedId) {
      setStatus('error');
      setError(new Error('Inserisci uno username Hacker News.'));
      return;
    }

    setStatus('loading');

    try {
      const { user: loadedUser, items: loadedItems } = await getUserSubmittedItems(trimmedId, 10);
      setUser(loadedUser);
      setItems(loadedItems);
      setStatus('success');
    } catch (loadError) {
      setStatus('error');
      setError(loadError);
    }
  };

  useEffect(() => {
    const initialUser = searchParams.get('user');

    if (initialUser) {
      setInputValue(initialUser);
      loadProfile(initialUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      loadProfile(inputValue);
    }
  };

  return (
    <main className="main-content">
      <section className="panel page-section">
        <h2>Profilo Utente</h2>
        <p className="section-description">
          Metriche utente (karma, data creazione account) e ultime attivita da submitted.
        </p>
        <div className="form-grid">
          <div className="form-group input-wide">
            <label htmlFor="user-id-input">Username HN</label>
            <div className="input-wrapper">
              <input
                id="user-id-input"
                type="text"
                placeholder="Es: pg"
                autoComplete="off"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                id="btn-load-user"
                type="button"
                className="btn btn-primary"
                onClick={() => loadProfile(inputValue)}
              >
                Carica Profilo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div id="user-profile">
          {status === 'idle' ? (
            <EmptyState message="Inserisci uno username per visualizzare il profilo." />
          ) : null}
          {status === 'loading' ? <Loading message="Caricamento profilo..." /> : null}
          {status === 'error' ? (
            <ErrorState title="Errore" message={error?.message || 'Impossibile recuperare il profilo.'} />
          ) : null}
          {status === 'success' && user ? <ProfileCard user={user} /> : null}
        </div>
      </section>

      <section className="page-section">
        <div id="user-activity">
          {status === 'idle' ? (
            <EmptyState message="Le ultime attivita verranno mostrate qui." />
          ) : null}
          {status === 'loading' ? <Loading message="Caricamento attivita..." /> : null}
          {status === 'error' ? <EmptyState message="" /> : null}
          {status === 'success' ? (
            <RecordsTable
              emptyMessage="Nessuna attivita recente disponibile."
              records={items}
              columns={ACTIVITY_COLUMNS}
            />
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default Profile;
