import { Empty } from "antd";

export default function ClaimsEmptyState() {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <span>
          <span style={{ color: "#374151", fontWeight: 500 }}>No claims found</span>
          <br />
          <span style={{ fontSize: 12, color: "#9ca3af" }}>
            Try adjusting your filters or search query
          </span>
        </span>
      }
      style={{ padding: "64px 0" }}
    />
  );
}
