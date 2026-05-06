import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { ClaimItem } from "@/src/types/claims";
import ClaimsNavbar from "./ClaimsNavbar";
import SopPanel from "./SopPanel";
import { MOCK_SOP_STEPS, MOCK_TIMELINE_EVENTS } from "./viewMocks";
import TimelinePanel from "./TimelinePanel";

export default function ViewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const claim = location.state?.claim as ClaimItem | undefined;

  // If no claim in state, redirect back to list
  if (!claim) {
    navigate("/list", { replace: true });
    return null;
  }

  return (
    <Layout style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <ClaimsNavbar />

      {/* Split pane body */}
      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          background: "#f3f4f6",
          gap: 0,
        }}
      >
        {/* Left — SOP Panel (~60%) */}
        <div
          style={{
            flex: "0 0 60%",
            minWidth: 0,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            margin: "16px 8px 8px 12px",
            borderRadius: 10,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            border: "1px solid #e5e7eb",
            background: "#fff",
          }}
        >
          <SopPanel steps={MOCK_SOP_STEPS} claimId={claim.id} />
        </div>

        {/* Right — Timeline Panel (~40%) */}
        <div
          style={{
            flex: "0 0 38%",
            minWidth: 0,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            margin: "16px 0px 8px 0px",
            borderRadius: 10,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            border: "1px solid #e5e7eb",
            background: "#fff",
          }}
        >
          <TimelinePanel events={MOCK_TIMELINE_EVENTS} />
        </div>
      </div>
    </Layout>
  );
}