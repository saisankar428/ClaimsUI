import { useState, useMemo } from "react";
import { SortKey, SortDir } from "@/constants/claims";
import { ClaimItem } from "@/types/claims";
import { nextSortDir, sortClaims } from "@/lib/claimsSort";

interface UseClaimsSortReturn {
  sorted: ClaimItem[];
  sortKey: SortKey | null;
  sortDir: SortDir;
  handleSort: (key: SortKey) => void;
}

export function useClaimsSort(data: ClaimItem[]): UseClaimsSortReturn {
  const [sortKey, setSortKey] = useState<SortKey | null>("dateReceived");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => nextSortDir(prev));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(
    () => sortClaims(data, sortKey, sortDir),
    [data, sortKey, sortDir]
  );

  return { sorted, sortKey, sortDir, handleSort };
}