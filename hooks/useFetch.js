import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

export default (url) => {
  const [searchUrl, setSearchUrl] = useState('');
  const [request, setRequest] = useState({
    isLoading: false,
    response: null,
    error: null,
  });

  const doFetch = useCallback((searchUrl = '') => {
    setSearchUrl(searchUrl);
    setRequest({isLoading: true});
  }, []);

  useEffect(() => {
    if (!request.isLoading) {
      return;
    }

    (async () => {
      try {
        const res = await axios.get(url + searchUrl);
        setRequest({response: res.data, isLoading: false});
      } catch (e) {
        setRequest({isLoading: false, error: e});
      }
    })();
  }, [request.isLoading, url, searchUrl]);

  return [{...request}, doFetch];
};
