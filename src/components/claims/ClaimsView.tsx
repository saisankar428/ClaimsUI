import { useCallback, useState } from "react";
import { Card, Skeleton, Typography } from "antd";
import { useClaims } from "@/src/hooks/useClaims";
import type { UseClaimsParams, ClaimsFilterValues } from "@/src/types/claims";
import ClaimsTable from "./ClaimsTable";
import ClaimsFilters from "./ClaimsFilters";
import ClaimsErrorState from "./ClaimsErrorState";
import Pagination from "./Pagination";

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
        height: "100%",
        margin: 20,
        gap: 16,
      }}
    >
      {/* Filters */}
      <ClaimsFilters onChange={handleFilterChange} />

      {/* Card */}
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          marginBottom:50
        }}
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
            padding: 0,
            paddingLeft:5
          },
        }}
      >
        {/* Header */}
        <Typography.Text
          style={{
            padding: "15px 10px",
            fontSize: 13,
            color: "#4b5563",
          }}
        >
          Showing{" "}
          <strong style={{ color: "#111827" }}>
            {start}–{end}
          </strong>{" "}
          of{" "}
          <strong style={{ color: "#111827" }}>
            {totalCount}
          </strong>{" "}
          claims
        </Typography.Text>

        {/* ONLY THIS AREA SCROLLS */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
          }}
        >
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

        {/* FIXED PAGINATION */}
        <div
          style={{
            borderTop: "1px solid #f0f0f0",
            padding: "12px 16px",
            background: "#fff",
          }}
        >
          <Pagination
            page={params.page}
            total={data.totalPages}
            rowsPerPage={params.limit}
            onChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
      </Card>
    </div>
  );
}