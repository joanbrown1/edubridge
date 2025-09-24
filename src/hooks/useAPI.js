import { useState, useCallback } from "react";
import { apiService } from "../services/api";

export function useAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (apiCall) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const processText = useCallback(
    (text, level) => {
      return execute(() => apiService.processText(text, level));
    },
    [execute]
  );

  const processFile = useCallback(
    (file, level) => {
      return execute(() => apiService.processFile(file, level));
    },
    [execute]
  );

  const getDemoContent = useCallback(() => {
    return execute(() => apiService.getDemoContent());
  }, [execute]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    processText,
    processFile,
    getDemoContent,
    reset,
  };
}
