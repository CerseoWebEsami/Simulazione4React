import { useCallback, useState } from 'react';

/**
 * Hook per gestire una sezione asincrona con stati loading/empty/error/success,
 * equivalente React del pattern `runAsyncSection` + `loadCollection`.
 *
 * @param {object} [options] - Opzioni dell'hook
 * @param {Function} [options.isEmpty] - Funzione che determina se il dato ricevuto è "vuoto"
 * @returns {{status: string, data: any, error: Error|null, run: Function}} - Stato corrente e funzione per avviare la richiesta
 */
export function useAsyncSection({ isEmpty } = {}) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const run = useCallback(
    async (request) => {
      setStatus('loading');
      setError(null);

      try {
        const result = await request();
        const empty = typeof isEmpty === 'function' ? isEmpty(result) : false;

        setData(result);
        setStatus(empty ? 'empty' : 'success');
        return result;
      } catch (requestError) {
        setError(requestError);
        setStatus('error');
        throw requestError;
      }
    },
    [isEmpty]
  );

  return { status, data, error, run, setStatus, setData };
}
