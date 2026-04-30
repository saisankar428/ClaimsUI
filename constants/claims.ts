import { ClaimItem } from "@/types/claims";

export const LOB_OPTIONS = [
  { value: "", label: "All LOBs" },
  { value: "BC Home", label: "BC Home" },
  { value: "Shared Admin", label: "Shared Admin" },
] as const;

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20, 25, 50] as const;
export type SortKey = keyof ClaimItem;
export type SortDir = "asc" | "desc";
