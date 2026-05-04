import { useCallback, useState } from "react";
import { Card, Skeleton, Typography } from "antd";
import ClaimsFilters from "@/components/claims/ClaimsFilters";
import Pagination from "@/components/claims/Pagination";
import ClaimsErrorState from "@/components/claims/ClaimsErrorState";
import { useClaims } from "@/hooks/useClaims";
import type { UseClaimsParams, ClaimsFilterValues } from "@/types/claims";
import ClaimsTable from "./ClaimsTable";

export default function ClaimsView() {
  const [params, setParams] = useState<UseClaimsParams>({
    page: 1,
    search: "",
    lob: "",
    limit: 15,
    status: "Active",
  });

  const { data, loading, error, retry } = useClaims(params);
  const { totalCount, page, pageSize } = data;
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  const handleFilterChange = useCallback((filters: ClaimsFilterValues) => {
    setParams((prev) => ({ ...prev, ...filters, page: 1 }));
  }, []);

  const handlePageChange = useCallback((p: number) => {
    setParams((prev) => ({ ...prev, page: p }));
  }, []);

  const handleRowsPerPageChange = useCallback((limit: number) => {
    setParams((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        margin: 20,
        gap: 16,
      }}
    >
      <ClaimsFilters onChange={handleFilterChange} />

      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
            padding: 0,
          },
        }}
      >
        <Typography.Text
          style={{
            padding: "12px 16px",
            display: "block",
            fontSize: 13,
            color: "#4b5563",
          }}
        >
          Showing{" "}
          <strong style={{ color: "#111827" }}>
            {start}–{end}
          </strong>{" "}
          of <strong style={{ color: "#111827" }}>{totalCount}</strong> claims
        </Typography.Text>

        {/* Scroll zone — skeleton replaces the table while loading so stale row counts
            are never visible during the 300 ms fetch delay */}
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
          {loading ? (
            <Skeleton
              active
              paragraph={{ rows: 10 }}
              style={{ padding: "16px 20px" }}
            />
          ) : error ? (
            <ClaimsErrorState message={error} onRetry={retry} />
          ) : (
            <ClaimsTable data={data.items} />
          )}
        </div>

        <Pagination
          page={params.page}
          total={data.totalPages}
          rowsPerPage={params.limit}
          onChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Card>
    </div>
  );
}
