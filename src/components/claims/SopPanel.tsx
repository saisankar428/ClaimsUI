import { useState } from "react";
import { DataReadSource, SopStep } from "./view";

const SOURCE_STYLES: Record<
  DataReadSource,
  { label: string; bg: string; color: string; border: string }
> = {
  IBM_CM: {
    label: "READ IBM CM",
    bg: "#eff6ff",
    color: "#1d4ed8",
    border: "#bfdbfe",
  },
  FACETS: {
    label: "READ FACETS",
    bg: "#f0fdf4",
    color: "#15803d",
    border: "#bbf7d0",
  },
  TRANSFORM: {
    label: "TRANSFORM",
    bg: "#faf5ff",
    color: "#7e22ce",
    border: "#e9d5ff",
  },
};

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#16a34a"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
        flexShrink: 0,
      }}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

interface SopStepNodeProps {
  step: SopStep;
  depth?: number;
  index: number;
}

function SopStepNode({ step, depth = 0, index }: SopStepNodeProps) {
  const [open, setOpen] = useState(true);
  const hasChildren = step.branches.some((b) => b.children.length > 0);
  const matchedBranch = step.branches.find((b) => b.matched);

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Question row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
          marginBottom: 8,
          cursor: hasChildren ? "pointer" : "default",
        }}
        onClick={() => hasChildren && setOpen((o) => !o)}
      >
        {hasChildren && (
          <span style={{ color: "#6b7280", marginTop: 1 }}>
            <ChevronIcon open={open} />
          </span>
        )}
        {!hasChildren && <span style={{ width: 14, flexShrink: 0 }} />}
        <span
          style={{
            fontSize: 14,
            color: "#111827",
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          <span style={{ fontWeight: 600, color: "#374151" }}>{index}. </span>
          {step.question}
        </span>
      </div>

      {/* Data reads */}
      {step.reads.map((read, i) => {
        const style = SOURCE_STYLES[read.source];
        return (
          <div
            key={i}
            style={{
              marginLeft: 22,
              marginBottom: 8,
              background: style.bg,
              border: `1px solid ${style.border}`,
              borderRadius: 6,
              padding: "8px 12px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: style.color,
                  background: "white",
                  border: `1px solid ${style.border}`,
                  borderRadius: 4,
                  padding: "2px 6px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  letterSpacing: 0.3,
                }}
              >
                {style.label}
              </span>
              <pre
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "#374151",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                }}
              >
                {read.query}
              </pre>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }}>
                {read.time}
              </span>
              {read.passed && <CheckIcon />}
            </div>
          </div>
        );
      })}

      {/* Lookup table */}
      {step.table && (
        <div style={{ marginLeft: 22, marginBottom: 8 }}>
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              overflow: "hidden",
              fontSize: 12,
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {step.table.headers.map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "6px 12px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#6b7280",
                        letterSpacing: 0.5,
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.table.rows.map((row, ri) => {
                  const isMatch = row[1] === step.reads[0]?.query.split("'")[1];
                  return (
                    <tr
                      key={ri}
                      style={{
                        background: isMatch ? "#eff6ff" : ri % 2 === 0 ? "#fff" : "#fafafa",
                        borderBottom: ri < step.table!.rows.length - 1 ? "1px solid #f3f4f6" : "none",
                      }}
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          style={{
                            padding: "6px 12px",
                            color: isMatch ? "#1d4ed8" : "#374151",
                            fontWeight: isMatch ? 500 : 400,
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Branch answers + children */}
      {open && matchedBranch && (
        <div style={{ marginLeft: 22 }}>
          {/* Branch label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: matchedBranch.children.length > 0 ? 12 : 0,
            }}
          >
            <ChevronIcon open={true} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>
              • {matchedBranch.label}:
            </span>
            {matchedBranch.matched && <CheckIcon />}
          </div>

          {/* Nested children */}
          {matchedBranch.children.length > 0 && (
            <div
              style={{
                marginLeft: 20,
                paddingLeft: 16,
                borderLeft: "2px solid #e5e7eb",
              }}
            >
              {matchedBranch.children.map((child, ci) => (
                <SopStepNode
                  key={child.id}
                  step={child}
                  depth={depth + 1}
                  index={ci + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface SopPanelProps {
  steps: SopStep[];
  claimId: string;
}

export default function SopPanel({ steps, claimId }: SopPanelProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
      }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid #e5e7eb",
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 1, textTransform: "uppercase" }}>
          Standard Operating Procedure
        </div>
        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
          Claim {claimId}
        </div>
      </div>

      {/* Scrollable steps */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 20px",
        }}
      >
        {steps.map((step, i) => (
          <SopStepNode key={step.id} step={step} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
