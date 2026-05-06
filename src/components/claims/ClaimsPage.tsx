import { Layout } from "antd";
import ClaimsNavbar from "./ClaimsNavbar";
import ClaimsView from "./ClaimsView";

export default function ClaimsPage() {
  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      {/* Header */}
      <ClaimsNavbar />

      {/* Content Wrapper */}
      <Layout style={{ height: "100%", overflow: "hidden" }}>
        <Layout.Content
          style={{
            padding: 0,
            background: "#f3f4f6",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <ClaimsView />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}