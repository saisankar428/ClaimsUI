import { useState } from "react";
import { Layout } from "antd";

const TABS = ["List", "View", "Complete"];

export default function ClaimsNavbar() {
  const [active, setActive] = useState("List");

  return (
    <Layout.Header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: 56,
        lineHeight: "56px",
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 600, color: "#0f172a" }}>
        Claims Adjudication
      </span>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: "#f3f4f6",
          borderRadius: 8,
          padding: 4,
          gap: 2,
        }}
      >
        {TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                padding: "6px 16px",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                border: "none",
                borderRadius: 6,
                background: isActive ? "#2563eb" : "transparent",
                color: isActive ? "#fff" : "#4b5563",
                transition: "all 0.15s",
                boxShadow: isActive ? "0 1px 2px rgba(0,0,0,0.15)" : "none",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </Layout.Header>
  );
}
