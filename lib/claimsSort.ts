import { SortKey, SortDir } from "@/constants/claims";
import { ClaimItem } from "@/types/claims";


const STATUS_ORDER: Record<string, number> = {
  Pending:  0,
  Active:   1,
  Complete: 2,
};

function compareValues(aVal: unknown, bVal: unknown, key: SortKey): number {
  if (key === "status") {
    const aOrder = STATUS_ORDER[String(aVal)] ?? 99;
    const bOrder = STATUS_ORDER[String(bVal)] ?? 99;
    return aOrder - bOrder;
  }
  return String(aVal ?? "").localeCompare(String(bVal ?? ""), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export function sortClaims(
  data: ClaimItem[],
  sortKey: SortKey | null,
  sortDir: SortDir
): ClaimItem[] {
  if (!sortKey) return data;
  return [...data].sort((a, b) => {
    const cmp = compareValues(a[sortKey], b[sortKey], sortKey);
    return sortDir === "asc" ? cmp : -cmp;
  });
}

export function nextSortDir(current: SortDir): SortDir {
  return current === "asc" ? "desc" : "asc";
}