/**
 * Indicatore di caricamento riusabile.
 *
 * @param {object} props - Props del componente
 * @param {string} [props.message="Caricamento..."] - Messaggio da visualizzare
 * @returns {React.JSX.Element} - Componente Loading.
 */
export function Loading({ message = 'Caricamento...' }) {
  return <div className="loading">{message}</div>;
}

/**
 * Messaggio di errore riusabile.
 *
 * @param {object} props - Props del componente
 * @param {string} [props.title="Errore"] - Titolo dell'errore
 * @param {string} [props.message=""] - Messaggio dettagliato
 * @returns {React.JSX.Element} - Componente ErrorState.
 */
export function ErrorState({ title = 'Errore', message = '' }) {
  return (
    <div className="error">
      <strong>{title}</strong>
      {message ? <p>{message}</p> : null}
    </div>
  );
}

/**
 * Messaggio "vuoto" riusabile, mostrato quando non ci sono dati da visualizzare.
 *
 * @param {object} props - Props del componente
 * @param {string} [props.message="Nessun dato disponibile."] - Messaggio da visualizzare
 * @returns {React.JSX.Element} - Componente EmptyState.
 */
export function EmptyState({ message = 'Nessun dato disponibile.' }) {
  return <div className="empty">{message}</div>;
}
