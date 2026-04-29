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

  // useCallback so child components that receive these as props never re-render
  // solely because the parent re-rendered. All three use the functional setState
  // form, so they have no external dependencies.
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
    <div className="flex flex-col flex-1 mx-5 my-5 gap-4">

      {/* Filters — outside and above the white card */}
      <ClaimsFilters onChange={handleFilterChange} />

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm flex flex-col p-4 flex-1">
        {/*
          The content area always occupies flex-1 regardless of state
          (loading / empty / error / data), so the Pagination below never
          shifts position.
        */}
        <div className="flex-1 min-h-0 overflow-auto">

          {loading && <ClaimsTableSkeleton />}

          {error && (
            <ClaimsErrorState message={error} onRetry={retry} />
          )}

          {isEmpty && <ClaimsEmptyState />}

          {showTable && (
            <table className="w-full text-left">
              <thead className="text-sm text-gray-500 border-b sticky top-0 bg-white">
                <tr>
                  <th className="py-2 pr-4 font-medium">Claim ID</th>
                  <th className="pr-4 font-medium">SCCF</th>
                  <th className="pr-4 font-medium">Employer</th>
                  <th className="pr-4 font-medium">LOB</th>
                  <th className="pr-4 font-medium">Date</th>
                  <th className="font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 pr-4 text-sm">{item.id}</td>
                    <td className="pr-4 text-sm text-gray-500">{item.sccfNumber}</td>
                    <td className="pr-4 text-sm">{item.employerGroup}</td>
                    <td className="pr-4 text-sm">{item.lob}</td>
                    <td className="pr-4 text-sm">{item.dateReceived}</td>
                    <td className="text-sm">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>

        {/* Pagination — always anchored to bottom of card, never shifts */}
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
