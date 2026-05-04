import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import ErrorBoundary from "./ErrorBoundary";
import ClaimsPage from "@/components/claims/ClaimsPage";

export default function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/claims" replace />} />
            <Route path="/claims" element={<ClaimsPage />} />
            <Route path="*" element={<Navigate to="/claims" replace />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </ConfigProvider>
  );
}
