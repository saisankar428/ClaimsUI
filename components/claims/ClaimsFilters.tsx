import { useState } from "react";
import { Input, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ClaimsFilterValues } from "@/types/claims";
import { LOB_OPTIONS } from "@/constants/claims";

type Props = {
  onChange: (filters: ClaimsFilterValues) => void;
};

const STATUS_TABS = ["Active", "Complete"];

export default function ClaimsFilters({ onChange }: Props) {
  const [activeStatus, setActiveStatus] = useState("Active");
  const [lob, setLob] = useState("");

  return (
    <Space wrap size="middle">
      {/* Status segmented control — matches original bg-blue-50/text-blue-600 design */}
      <div
        style={{
          display: "inline-flex",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {STATUS_TABS.map((tab, i) => {
          const isActive = activeStatus === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveStatus(tab);
                onChange({ status: tab });
              }}
              style={{
                padding: "8px 16px",
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                cursor: "pointer",
                border: "none",
                borderRight: i < STATUS_TABS.length - 1 ? "1px solid #e5e7eb" : "none",
                background: isActive ? "#eff6ff" : "#fff",
                color: isActive ? "#2563eb" : "#6b7280",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <Input
        prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
        placeholder="Search claim ID or employer group"
        style={{ width: 320 }}
        allowClear
        onChange={(e) => onChange({ search: e.target.value })}
      />

      <Space size="small">
        <span style={{ fontSize: 13, color: "#4b5563", fontWeight: 500 }}>LOB</span>
        <Select
          value={lob}
          style={{ width: 144 }}
          options={LOB_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          onChange={(val) => {
            setLob(val);
            onChange({ lob: val });
          }}
        />
      </Space>
    </Space>
  );
}
