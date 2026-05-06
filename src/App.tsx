import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import ErrorBoundary from "./ErrorBoundary";
import { ClaimsPage } from "./components/claims";
import ViewPage from "./components/claims/ViewPage";
import CompletePage from "./components/claims/CompletePage";

export default function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Navigate to="/list" replace />} />

            {/* Pages */}
            <Route path="/list" element={<ClaimsPage />} />
            <Route path="/view" element={<ViewPage />} />
            <Route path="/complete" element={<CompletePage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/list" replace />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </ConfigProvider>
  );
}
