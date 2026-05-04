import { Layout } from "antd";
import ClaimsNavbar from "./ClaimsNavbar";
import ClaimsView from "./ClaimsView";

export default function ClaimsPage() {
  return (
    <Layout style={{ height: "100vh", background: "#f3f4f6" }}>
      <ClaimsNavbar />
      <Layout.Content
        style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <ClaimsView />
      </Layout.Content>
    </Layout>
  );
}
