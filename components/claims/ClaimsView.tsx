"use client";

import { useState } from "react";
import ClaimsFilters from "@/components/claims/ClaimsFilters";
import Pagination from "@/components/claims/Pagination";
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

  const { data, loading } = useClaims(params);

  const handleFilterChange = (filters: ClaimsFilterValues) => {
    setParams((prev) => ({ ...prev, ...filters, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handleRowsPerPageChange = (limit: number) => {
    setParams((prev) => ({ ...prev, limit, page: 1 }));
  };

  return (
    <div className="flex flex-col flex-1 mx-5 mt-5 mb-5 gap-4">
      {/* Filters — outside and above the white card */}
      <ClaimsFilters onChange={handleFilterChange} />

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm flex flex-col p-4 flex-1">
        {/*
          Content area always keeps flex-1 so pagination never shifts.
          During loading, the wrapper retains its space.
        */}

         {/* Count will replace with actual */}
        <p className="text-sm text-gray-600 mb-3">
          Showing <span className="font-semibold text-black">{"Start"}</span>
          <span className="font-semibold text-black">{"-"}</span>
          <span className="font-semibold text-black">{"End"}</span> of{" "}
          <span className="font-semibold text-black">{"TotalCount"}</span>{" "}
          claims
        </p>

        <div className="flex-1 min-h-0 relative overflow-auto">
          {loading ? (
            <p className="text-sm text-gray-500 py-4">Loading...</p>
          ) : (
            <ClaimsTable data={data.items} />
          )}
        </div>
        {/* Pagination — always anchored to bottom of card */}
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
