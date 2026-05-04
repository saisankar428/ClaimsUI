import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ClaimItem } from "@/types/claims";
import { SortKey } from "@/constants/claims";
import { CLAIMS_COLUMNS } from "@/constants/claimsColumns";
import { useClaimsSort } from "@/hooks/useClaimsSort";
import StatusBadge from "./StatusBadge";
import AutomationBar from "./AutomationBar";
import ClaimsEmptyState from "./ClaimsEmptyState";

interface Props {
  data: ClaimItem[];
}

// Inline SVGs matching the exact lucide v1 icon paths (ArrowUpDown / ArrowUp / ArrowDown)
function SortIcon({
  columnKey,
  sortKey,
  sortDir,
}: {
  columnKey: SortKey;
  sortKey: SortKey | null;
  sortDir: "asc" | "desc";
}) {
  if (sortKey !== columnKey) {
    // lucide ArrowUpDown — two full arrows with stems
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="m21 16-4 4-4-4" />
        <path d="M17 20V4" />
        <path d="m3 8 4-4 4 4" />
        <path d="M7 4v16" />
      </svg>
    );
  }
  if (sortDir === "asc") {
    // lucide ArrowUp
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="m5 12 7-7 7 7" />
        <path d="M12 19V5" />
      </svg>
    );
  }
  // lucide ArrowDown
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2563eb"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

export default function ClaimsTable({ data }: Props) {
  const { sorted, sortKey, sortDir, handleSort } = useClaimsSort(data);

  const columns: ColumnsType<ClaimItem> = CLAIMS_COLUMNS.map(({ label, key }) => ({
    title: (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span
          style={{
            textTransform: "uppercase",
            fontSize: 12,
            fontWeight: 600,
            color: sortKey === key ? "#1d4ed8" : "#9ca3af",
          }}
        >
          {label}
        </span>
        <SortIcon columnKey={key} sortKey={sortKey} sortDir={sortDir} />
      </div>
    ),
    dataIndex: key,
    key,
    onHeaderCell: () => ({
      onClick: () => handleSort(key),
      style: { cursor: "pointer", userSelect: "none" },
    }),
    render:
      key === "status"
        ? (val: string) => <StatusBadge status={val} />
        : key === "automation"
        ? (val: number) => <AutomationBar value={val} />
        : undefined,
  }));

  return (
    <Table
      dataSource={sorted}
      columns={columns}
      rowKey="id"
      pagination={false}
      locale={{ emptyText: <ClaimsEmptyState /> }}
      size="small"
      scroll={{ x: true }}
      showSorterTooltip={false}
    />
  );
}
