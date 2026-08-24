/**
 * Footer dell'app.
 *
 * @returns {React.JSX.Element} - Componente Footer.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          HN Tech Feed | Dati da{' '}
          <a href="https://hacker-news.firebaseio.com" target="_blank" rel="noreferrer">
            Hacker News API
          </a>
        </p>
        <p>Top Stories, thread commenti, profili utente e read-it-later.</p>
      </div>
    </footer>
  );
}

export default Footer;
