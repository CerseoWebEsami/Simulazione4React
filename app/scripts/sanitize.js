// sanitize.js - utility di pulizia testo/HTML

/**
 * Rimuove i tag HTML da una stringa e restituisce solo il testo.
 * Utile perché l'API di Hacker News restituisce `text`/`about` come HTML.
 *
 * @param {string} html - HTML da cui estrarre il testo
 * @returns {string} - Testo senza tag HTML
 */
export function stripHtml(html) {
  if (!html) {
    return '';
  }

  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}
