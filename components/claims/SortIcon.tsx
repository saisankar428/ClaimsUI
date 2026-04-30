import { SortDir, SortKey } from "@/constants/claims";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface SortIconProps {
  column: SortKey;
  sortKey: SortKey | null;
  sortDir: SortDir;
}

export default function SortIcon({ column, sortKey, sortDir }: SortIconProps) {
  if (sortKey !== column) return <ArrowUpDown className="w-3 h-3 text-gray-400" />;
  return sortDir === "asc"
    ? <ArrowUp   className="w-3 h-3 text-blue-600" />
    : <ArrowDown className="w-3 h-3 text-blue-600" />;
}