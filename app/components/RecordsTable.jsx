import { EmptyState } from './AsyncState.jsx';

/**
 * Tabella di record generica con colonne configurabili e azioni opzionali.
 *
 * @param {object} props - Props del componente
 * @param {string} props.emptyMessage - Messaggio da mostrare se non ci sono record
 * @param {Array<object>} props.records - Array di record da visualizzare
 * @param {Array<{header: string, render: Function}>} props.columns - Definizione delle colonne
 * @param {Function} [props.onDelete] - Callback per la cancellazione di una riga
 * @param {Function} [props.onDeleteAll] - Callback per cancellare tutti i record
 * @param {string} [props.clearAllLabel] - Label bottone cancella tutti
 * @param {string} [props.deleteLabel] - Label bottone rimuovi riga
 * @returns {React.JSX.Element} - Componente RecordsTable.
 */
function RecordsTable({
  emptyMessage,
  records,
  columns,
  onDelete,
  onDeleteAll,
  clearAllLabel = 'Cancella tutti',
  deleteLabel = 'Rimuovi',
}) {
  if (!Array.isArray(records) || records.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  const withActions = typeof onDelete === 'function';

  const handleDeleteAll = () => {
    const confirmed = confirm('Vuoi svuotare completamente la lista?');

    if (confirmed) {
      onDeleteAll();
    }
  };

  return (
    <section className="records-panel">
      <div className="records-header">
        {typeof onDeleteAll === 'function' ? (
          <button id="btn-clear-all" className="btn btn-danger" type="button" onClick={handleDeleteAll}>
            {clearAllLabel}
          </button>
        ) : null}
      </div>
      <div className="records-table-wrapper">
        <table className="records-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.header}>{column.header}</th>
              ))}
              {withActions ? <th>Azioni</th> : null}
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr className="records-row" key={record.id ?? index}>
                {columns.map((column) => (
                  <td key={column.header}>{String(column.render(record, index))}</td>
                ))}
                {withActions ? (
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-delete"
                      onClick={() => onDelete(record)}
                    >
                      {deleteLabel}
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecordsTable;
