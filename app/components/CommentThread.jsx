import { useState } from 'react';
import { Link } from 'react-router';
import { getCommentChildren } from '../scripts/api.js';
import { stripHtml } from '../scripts/sanitize.js';

/**
 * Nodo singolo di un commento, con caricamento lazy delle risposte figlie.
 *
 * @param {object} props - Props del componente
 * @param {object} props.comment - Oggetto commento mappato
 * @param {number} [props.depth=0] - Profondità del commento (usata per la classe di stile)
 * @returns {React.JSX.Element} - Componente CommentNode.
 */
function CommentNode({ comment, depth = 0 }) {
  const [children, setChildren] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const author = comment.by || 'anon';
  const text = stripHtml(comment.text || '') || '[commento vuoto]';
  const hasKids = Array.isArray(comment.kids) && comment.kids.length > 0;

  const handleToggle = async () => {
    if (children !== null) {
      setExpanded((current) => !current);
      return;
    }

    setLoading(true);
    const loadedChildren = await getCommentChildren(comment);
    setChildren(loadedChildren);
    setExpanded(true);
    setLoading(false);
  };

  let buttonLabel = `Mostra risposte (${comment.kids.length})`;
  if (loading) {
    buttonLabel = 'Caricamento risposte...';
  } else if (expanded) {
    buttonLabel = 'Nascondi risposte';
  }

  return (
    <article className={`comment-card comment-card--depth-${Math.min(depth, 4)}`}>
      <p className="comment-meta">
        {author !== 'anon' ? (
          <Link className="comment-author-link" to={`/profile?user=${encodeURIComponent(comment.by)}`}>
            {author}
          </Link>
        ) : (
          author
        )}{' '}
        - {comment.timeLabel || 'N/D'}
      </p>
      <div className="comment-text">
        <p>{text}</p>
      </div>
      <div className="comment-actions">
        {hasKids ? (
          <button type="button" className="btn btn-secondary" disabled={loading} onClick={handleToggle}>
            {buttonLabel}
          </button>
        ) : null}
      </div>
      {expanded ? (
        <div className="comment-children">
          <CommentsTree comments={children || []} depth={depth + 1} />
        </div>
      ) : null}
    </article>
  );
}

/**
 * Renderizza ricorsivamente un array di commenti.
 *
 * @param {object} props - Props del componente
 * @param {Array<object>} props.comments - Array di commenti mappati
 * @param {number} [props.depth=0] - Profondità corrente della ricorsione
 * @returns {React.JSX.Element} - Componente CommentsTree.
 */
function CommentsTree({ comments, depth = 0 }) {
  const visibleComments = comments.filter((comment) => comment && comment.type === 'comment');

  return (
    <div className={depth === 0 ? 'thread-container' : 'comment-children-list'}>
      {visibleComments.map((comment) => (
        <CommentNode key={comment.id} comment={comment} depth={depth} />
      ))}
    </div>
  );
}

export default CommentsTree;
