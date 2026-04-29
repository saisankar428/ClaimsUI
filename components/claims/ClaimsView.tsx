"use client";

import { useState } from "react";
import ClaimsFilters from "@/components/claims/ClaimsFilters";
import Pagination from "@/components/claims/Pagination";
import { useClaims } from "@/hooks/useClaims";
import type { UseClaimsParams, ClaimsFilterValues } from "@/types/claims";

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
        <div className="flex-1 min-h-0 relative overflow-auto">
          {loading ? (
            <p className="text-sm text-gray-500 py-4">Loading...</p>
          ) : (
            <table className="w-full text-left">
              <thead className="text-sm text-gray-500 border-b sticky top-0 bg-white">
                <tr>
                  <th className="py-2 pr-4">Claim ID</th>
                  <th className="pr-4">SCCF</th>
                  <th className="pr-4">Employer</th>
                  <th className="pr-4">LOB</th>
                  <th className="pr-4">Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 pr-4">{item.id}</td>
                    <td className="pr-4">{item.sccfNumber}</td>
                    <td className="pr-4">{item.employerGroup}</td>
                    <td className="pr-4">{item.lob}</td>
                    <td className="pr-4">{item.dateReceived}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
