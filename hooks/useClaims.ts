import { useCallback, useEffect, useState } from "react";
import type { ClaimItem, UseClaimsData, UseClaimsParams } from "@/types/claims";
import ALL_CLAIMS from "@/data/claims.json";

export type { ClaimItem, UseClaimsData, UseClaimsParams };

export const useClaims = (params: UseClaimsParams) => {
  const paramsJSON = JSON.stringify(params);
  const [data, setData] = useState<UseClaimsData>({ items: [], totalPages: 1 ,totalCount: 0,page: params.page,pageSize: params.limit,});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Incrementing this triggers a retry with the same params.
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => {
      setLoading(true);
      setError(null);
    }, 0);

    const fetchTimer = window.setTimeout(() => {
      try {
        let filtered = ALL_CLAIMS;

        if (params.search) {
          const q = params.search.toLowerCase();
          filtered = filtered.filter(
            (c) =>
              c.id.toLowerCase().includes(q) ||
              c.employerGroup.toLowerCase().includes(q)
          );
        }

        if (params.lob) {
          filtered = filtered.filter((c) => c.lob === params.lob);
        }

        if (params.status) {
          filtered = filtered.filter((c) => c.status === params.status);
        }

        const totalPages = Math.max(1, Math.ceil(filtered.length / params.limit));
        const start = (params.page - 1) * params.limit;
        const items = filtered.slice(start, start + params.limit);
        const totalCount = filtered.length;

        setData({ items, totalPages,totalCount,page: params.page,pageSize: params.limit, });
        setError(null);
        setLoading(false);
      } catch {
        setError("Failed to load claims. Please try again.");
        setLoading(false);
      }
    }, 300);

    return () => {
      window.clearTimeout(loadingTimer);
      window.clearTimeout(fetchTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsJSON, retryKey]);

  const retry = useCallback(() => setRetryKey((k) => k + 1), []);

  return { data, loading, error, retry };
};
