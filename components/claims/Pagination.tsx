import { Button, Select, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ROWS_PER_PAGE_OPTIONS } from "@/constants/claims";

type Props = {
  page: number;
  total: number;
  onChange: (page: number) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (rows: number) => void;
};

// Thin chevron matching standard dropdown indicator style
const ChevronDown = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ pointerEvents: "none" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Pagination({
  page,
  total,
  onChange,
  rowsPerPage = 15,
  onRowsPerPageChange,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderTop: "1px solid #f0f0f0",
      }}
    >
      <Space size="small">
        <span style={{ fontSize: 13, color: "#4b5563" }}>Rows per page</span>
        <Select
          value={rowsPerPage}
          style={{ width: 72 }}
          suffixIcon={<ChevronDown />}
          options={ROWS_PER_PAGE_OPTIONS.map((n) => ({ value: n, label: String(n) }))}
          onChange={(val) => onRowsPerPageChange?.(val)}
        />
      </Space>

      <Space size="small">
        <Button
          icon={<LeftOutlined />}
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          size="small"
        >
          Prev
        </Button>
        <span style={{ fontSize: 13, color: "#4b5563", whiteSpace: "nowrap" }}>
          Page <strong style={{ color: "#1f2937" }}>{page}</strong> of{" "}
          <strong style={{ color: "#1f2937" }}>{total}</strong>
        </span>
        <Button
          onClick={() => onChange(page + 1)}
          disabled={page === total}
          size="small"
          iconPosition="end"
          icon={<RightOutlined />}
        >
          Next
        </Button>
      </Space>
    </div>
  );
}
