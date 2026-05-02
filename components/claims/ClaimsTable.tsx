"use client";

import { ClaimItem } from "@/types/claims";
import { useClaimsSort } from "@/hooks/useClaimsSort";
import ClaimsTableHeader from "./ClaimsTableHeader";
import ClaimsRow from "./ClaimsRow";

export default function ClaimsTable({ data }: { data: ClaimItem[] }) {
  const { sorted, sortKey, sortDir, handleSort } = useClaimsSort(data);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <ClaimsTableHeader
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
        />
        <tbody>
          {sorted.map((item) => (
            <ClaimsRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
// "use client";

// import { useState, useMemo } from "react";
// import { ClaimItem } from "@/types/claims";
// import ClaimsRow from "./ClaimsRow";
// import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

// type SortKey = keyof ClaimItem;
// type SortDir = "asc" | "desc";

// interface Column {
//   label: string;
//   key: SortKey;
// }

// const COLUMNS: Column[] = [
//   { label: "Claim ID",       key: "id"            },
//   { label: "SCCF",           key: "sccfNumber"    },
//   { label: "Employer Group", key: "employerGroup" },
//   { label: "LOB",            key: "lob"           },
//   { label: "Date Received",  key: "dateReceived"  },
//   { label: "Status",         key: "status"        },
//   { label: "Automation",     key: "automation"    },
// ];

// function SortIcon({ column, sortKey, sortDir }: { column: SortKey; sortKey: SortKey | null; sortDir: SortDir }) {
//   if (sortKey !== column) return <ArrowUpDown className="w-3 h-3 text-gray-400" />;
//   return sortDir === "asc"
//     ? <ArrowUp   className="w-3 h-3 text-blue-600" />
//     : <ArrowDown className="w-3 h-3 text-blue-600" />;
// }

// export default function ClaimsTable({ data }: { data: ClaimItem[] }) {
//   const [sortKey, setSortKey] = useState<SortKey | null>("dateReceived");
//   const [sortDir, setSortDir] = useState<SortDir>("desc");

//   const handleSort = (key: SortKey) => {
//     if (sortKey === key) {
//       setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortKey(key);
//       setSortDir("asc");
//     }
//   };

//   const sorted = useMemo(() => {
//     if (!sortKey) return data;
//     return [...data].sort((a, b) => {
//       const aVal = a[sortKey] ?? "";
//       const bVal = b[sortKey] ?? "";
//       const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true, sensitivity: "base" });
//       return sortDir === "asc" ? cmp : -cmp;
//     });
//   }, [data, sortKey, sortDir]);

//   return (
//     <div className="bg-white shadow rounded-lg overflow-hidden">
//       <table className="w-full text-sm">
//         <thead className="bg-gray-100 text-left">
//           <tr>
//             {COLUMNS.map(({ label, key }) => {
//               const isActive = sortKey === key;
//               return (
//                 <th
//                   key={key}
//                   onClick={() => handleSort(key)}
//                   className={`
//                     p-3 uppercase font-semibold cursor-pointer select-none
//                     transition-colors hover:bg-gray-200
//                     ${isActive ? "text-blue-700" : "text-gray-700 opacity-60"}
//                   `}
//                 >
//                   <div className="flex items-center gap-1">
//                     {label}
//                     <SortIcon column={key} sortKey={sortKey} sortDir={sortDir} />
//                   </div>
//                 </th>
//               );
//             })}
//           </tr>
//         </thead>

//         <tbody>
//           {sorted.map((item) => (
//             <ClaimsRow key={item.id} item={item} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// "use client";

// import { ClaimItem } from "@/types/claims";
// import ClaimsRow from "./ClaimsRow";
// import { ArrowDown, ArrowUpDown } from "lucide-react";

// export default function ClaimsTable({ data }: { data: ClaimItem[] }) {
//   return (
//     <div className="bg-white shadow rounded-lg overflow-hidden">
//       <table className="w-full text-sm">
//         <thead className="bg-gray-100 text-left">
//           <tr>
//             <th className="p-3 uppercase font-semibold text-gray-700 opacity-60">
//               <div className="flex items-center gap-1">
//                 Claim ID
//                 <ArrowUpDown className="w-3 h-3 text-gray-800" />
//               </div>
//             </th>
//             <th className="p-3 uppercase font-semibold text-gray-700 opacity-60 ">
//               <div className="flex items-center gap-1">
//                 SCCF
//                 <ArrowUpDown className="w-3 h-3 text-gray-800" />
//               </div>
//             </th>
//             <th className="p-3 uppercase font-semibold text-gray-700 opacity-60 ">
//               <div className="flex items-center gap-1">
//                 Employer Group
//                 <ArrowUpDown className="w-3 h-3 text-gray-800" />
//               </div>
//             </th>
//             <th className="p-3 uppercase font-semibold text-gray-700 opacity-60 ">
//               <div className="flex items-center gap-1">
//                 LOB
//                 <ArrowUpDown className="w-3 h-3 text-gray-800" />
//               </div>
//             </th>
//             <th className="p-3 uppercase">
//               <div className="flex items-center gap-1">
//                 Date Received
//                 <ArrowDown className="w-3 h-3 text-blue-800" />
//               </div>
//             </th>
//             <th className="p-3 uppercase font-semibold text-gray-700 opacity-60 ">
//               <div className="flex items-center gap-1">
//                 Status
//                 <ArrowUpDown className="w-3 h-3 text-gray-800" />
//               </div>
//             </th>
//             <th className="p-3 uppercase font-semibold text-gray-700 opacity-60 ">
//               <div className="flex items-center gap-1">
//                 Automation
//                 <ArrowUpDown className="w-3 h-3 text-gray-800" />
//               </div>
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((item) => (
//             <ClaimsRow key={item.id} item={item} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
