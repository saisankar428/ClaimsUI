import { Tag } from "antd";

export default function StatusBadge({ status }: { status: string }) {
  return (
    <Tag
      color={status === "Complete" ? "green" : "gold"}
      style={{ fontWeight: 600, borderRadius: 2 }}
    >
      {status}
    </Tag>
  );
}
