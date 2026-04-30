import { CLAIMS_COLUMNS } from "@/constants/claimsColumns";
import SortIcon from "./SortIcon";
import { SortDir, SortKey } from "@/constants/claims";

interface ClaimsTableHeaderProps {
  sortKey: SortKey | null;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}

export default function ClaimsTableHeader({ sortKey, sortDir, onSort }: ClaimsTableHeaderProps) {
  return (
    <thead className="bg-gray-100 text-left">
      <tr>
        {CLAIMS_COLUMNS.map(({ label, key }) => {
          const isActive = sortKey === key;
          return (
            <th
              key={key}
              onClick={() => onSort(key)}
              className={`
                p-3 uppercase font-semibold cursor-pointer select-none
                transition-colors hover:bg-gray-200
                ${isActive ? "text-blue-700" : "text-gray-700 opacity-60"}
              `}
            >
              <div className="flex items-center gap-1">
                {label}
                <SortIcon column={key} sortKey={sortKey} sortDir={sortDir} />
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}