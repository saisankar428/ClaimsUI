import { ClaimItem } from "@/src/types/claims";
import { Button, Layout } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const TABS = ["List", "View", "Complete"] as const;

const STATUS_BADGE_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  Active:    { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  Complete:  { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  Accepted:  { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  Pended:    { bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
  Rejected:  { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_BADGE_STYLES[status] ?? STATUS_BADGE_STYLES["Active"];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        letterSpacing: 0.2,
        flexShrink: 0,
        lineHeight: "18px",
        height: 22,
      }}
    >
      {status.toUpperCase()}
    </span>
  );
}

export default function ClaimsNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const claim = location.state?.claim as ClaimItem | undefined;

  const active =
    location.pathname === "/list"
      ? "List"
      : location.pathname === "/view"
      ? "View"
      : "Complete";

  const routeMap: Record<(typeof TABS)[number], string> = {
    List: "/list",
    View: "/view",
    Complete: "/complete",
  };

  const isDetailView = active === "View" || active === "Complete";

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
        gap: 16,
        flexShrink: 0,
      }}
    >
      {/* Left: title or claim ID + badge */}
      {isDetailView && claim ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#111827",
              whiteSpace: "nowrap",
            }}
          >
            {claim.id}
          </span>
          <StatusBadge status={claim.status} />
        </div>
      ) : (
        <span style={{ fontSize: 18, fontWeight: 600, color: "#111827", whiteSpace: "nowrap" }}>
          Claims Adjudication
        </span>
      )}

      {/* Right: tab buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f3f4f6",
          borderRadius: 8,
          padding: 4,
          gap: 4,
          flexShrink: 0,
        }}
      >
        {TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <Button
              key={tab}
              onClick={() => navigate(routeMap[tab], { state: { claim } })}
              style={{
                padding: "6px 16px",
                border: "none",
                borderRadius: 6,
                background: isActive ? "#2563eb" : "transparent",
                color: isActive ? "#fff" : "#4b5563",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {tab}
            </Button>
          );
        })}
      </div>
    </Layout.Header>
  );
}


// import { ClaimItem } from "@/src/types/claims";
// import { Button, Layout } from "antd";
// import { useNavigate, useLocation } from "react-router-dom";


// const TABS = ["List", "View", "Complete"] as const;

// export default function ClaimsNavbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//    const claim = location.state?.claim as ClaimItem | undefined;

//   const active =
//     location.pathname === "/list"
//       ? "List"
//       : location.pathname === "/view"
//       ? "View"
//       : "Complete";

//   const routeMap: Record<(typeof TABS)[number], string> = {
//     List: "/list",
//     View: "/view",
//     Complete: "/complete",
//   };

//   const title =
//     active === "View" && claim
//       ? `Claim ${claim.id}`
//       : active === "Complete" && claim
//       ? `Claim ${claim.id}`
//       : "Claims Adjudication";

//   return (
//     <Layout.Header
//       style={{
//         background: "#fff",
//         borderBottom: "1px solid #e5e7eb",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "0 24px",
//         height: 56,
//       }}
//     >
//  <span
//         style={{
//           fontSize: active === "List" ? 18 : 14,
//           fontWeight: 600,
//           color: "#111827",
//           whiteSpace: "nowrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//         }}
//       >
//         {title}
//       </span>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           background: "#f3f4f6",
//           borderRadius: 8,
//           padding: 4,
//           gap: 4,
//           flexShrink: 0,
//         }}
//       >
//         {TABS.map((tab) => {
//           const isActive = active === tab;
//           return (
//             <Button
//               key={tab}
//               onClick={() => navigate(routeMap[tab])}
//               style={{
//                 padding: "6px 16px",
//                 border: "none",
//                 borderRadius: 6,
//                 background: isActive ? "#2563eb" : "transparent",
//                 color: isActive ? "#fff" : "#4b5563",
//                 cursor: "pointer",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {tab}
//             </Button>
//           );
//         })}
//       </div>
//     </Layout.Header>
//   );
// }