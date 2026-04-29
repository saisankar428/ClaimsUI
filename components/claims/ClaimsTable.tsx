"use client";

import { ClaimItem } from "@/types/claims";
import ClaimsRow from "./ClaimsRow";
import { ArrowDown, ArrowUpDown } from "lucide-react";

export default function ClaimsTable({ data }: { data: ClaimItem[] }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 uppercase font-semibold text-gray-700 opacity-60">
              <div className="flex items-center gap-1">
                Claim ID
                <ArrowUpDown className="w-3 h-3 text-gray-800" />
              </div>
            </th>
            <th className="p-3 uppercase font-semibold text-gray-700 opacity-60 ">
              <div className="flex items-center gap-1">
                SCCF
                <ArrowUpDown className="w-3 h-3 text-gray-800" />
              </div>
            </th>
            <th className="p-3 uppercase font-semibold text-gray-700 opacity-60 ">
              <div className="flex items-center gap-1">
                Employer Group
                <ArrowUpDown className="w-3 h-3 text-gray-800" />
              </div>
            </th>
            <th className="p-3 uppercase font-semibold text-gray-700 opacity-60 ">
              <div className="flex items-center gap-1">
                LOB
                <ArrowUpDown className="w-3 h-3 text-gray-800" />
              </div>
            </th>
            <th className="p-3 uppercase">
              <div className="flex items-center gap-1">
                Date Received
                <ArrowDown className="w-3 h-3 text-blue-800" />
              </div>
            </th>
            <th className="p-3 uppercase font-semibold text-gray-700 opacity-60 ">
              <div className="flex items-center gap-1">
                Status
                <ArrowUpDown className="w-3 h-3 text-gray-800" />
              </div>
            </th>
            <th className="p-3 uppercase font-semibold text-gray-700 opacity-60 ">
              <div className="flex items-center gap-1">
                Automation
                <ArrowUpDown className="w-3 h-3 text-gray-800" />
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <ClaimsRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
