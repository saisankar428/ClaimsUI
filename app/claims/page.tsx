"use client";

import { useState } from "react";
import ClaimsFilters from "../../components/claims/ClaimsFilters";
import Pagination from "../../components/claims/Pagination";
import { useClaims, type UseClaimsParams } from "../../lib/useClaims";
import ClaimsNavbar from "@/components/claims/ClaimsNavbar";

export default function ClaimsPage() {
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const [params, setParams] = useState<UseClaimsParams>({
    page: 1,
    search: "",
    lob: "",
    limit: rowsPerPage,
  });

  const { data, loading } = useClaims({ ...params, limit: rowsPerPage });

  const handleFilterChange = (filters: Partial<UseClaimsParams>) => {
    setParams((prev) => ({
      ...prev,
      ...filters,
      page: 1, // reset to page 1 on filter change
    }));
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setParams((prev) => ({ ...prev, page: 1 })); // reset to page 1
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Navbar */}
      <ClaimsNavbar />

      {/* Page Content */}
      <div className="flex flex-col flex-1">

        {/* Filters */}
        <ClaimsFilters onChange={handleFilterChange} />

        {/* Table Card */}
        <div className="bg-white mx-5 mt-4 mb-5 p-4 rounded-xl shadow-sm flex-1 flex flex-col">

          {loading ? (
            <p className="text-sm text-gray-500 py-4">Loading...</p>
          ) : (
            <div className="overflow-auto flex-1">
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
            </div>
          )}

          {/* Pagination — always pinned to bottom of card */}
          <Pagination
            page={params.page}
            total={data.totalPages}
            rowsPerPage={rowsPerPage}
            onChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />

        </div>
      </div>
    </div>
  );
}