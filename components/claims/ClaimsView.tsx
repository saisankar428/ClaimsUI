"use client";

import { useCallback, useState } from "react";
import ClaimsFilters from "@/components/claims/ClaimsFilters";
import Pagination from "@/components/claims/Pagination";
import ClaimsTableSkeleton from "@/components/claims/ClaimsTableSkeleton";
import ClaimsEmptyState from "@/components/claims/ClaimsEmptyState";
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

  const handlePageChange = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  const handleRowsPerPageChange = useCallback((limit: number) => {
    setParams((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const isEmpty = !loading && !error && data.items.length === 0;
  const showTable = !loading && !error && data.items.length > 0;

  return (
    <div className="flex flex-col flex-1 min-h-0 mx-5 my-5 gap-4">
      {/* Filters — shrinks to its natural height, never grows */}
      <ClaimsFilters onChange={handleFilterChange} />

      {/* Table Card — takes all remaining vertical space, clips overflow */}
      <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">

        {/* Row count label — pinned, never scrolls */}
        <p className="text-sm text-gray-600 mb-3 m-4 shrink-0">
          Showing <span className="font-semibold text-black">{start}</span>
          <span className="font-semibold text-black">{"-"}</span>
          <span className="font-semibold text-black">{end}</span> of{" "}
          <span className="font-semibold text-black">{totalCount}</span>{" "}
          claims
        </p>

        {/* Scroll zone — only this region scrolls */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {loading && <ClaimsTableSkeleton />}

          {error && <ClaimsErrorState message={error} onRetry={retry} />}

          {isEmpty && <ClaimsEmptyState />}

          {showTable && <ClaimsTable data={data.items} />}
        </div>

        {/* Pagination — pinned to the bottom of the card, never scrolls */}
        <Pagination
          page={params.page}
          total={data.totalPages}
          rowsPerPage={params.limit}
          onChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
}
