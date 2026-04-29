"use client";

import { useState } from "react";
import type { ClaimsFilterValues } from "@/types/claims";
import { LOB_OPTIONS } from "@/constants/claims";

type Props = {
  onChange: (filters: ClaimsFilterValues) => void;
};

const STATUS_TABS = ["Active", "Complete"];

export default function ClaimsFilters({ onChange }: Props) {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">

      {/* Active / Complete segmented control */}
      <div className="inline-flex border border-gray-200 rounded-lg overflow-hidden divide-x divide-gray-200">
        {STATUS_TABS.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                onChange({ status: tab });
              }}
              className={`
                px-4 py-2 text-sm font-medium transition-colors
                ${isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "bg-white text-gray-500 hover:bg-gray-50"}
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative w-full lg:w-96 bg-white rounded-lg">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          {/* Two-element magnifying glass: circle + handle */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" strokeLinecap="round" />
          </svg>
        </span>

        <input
          type="text"
          placeholder="Search claim ID or employer group"
          className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onChange({ search: e.target.value })}
        />
      </div>

      {/* LOB Label + Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">LOB</span>

        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-36 focus:outline-none focus:ring-2 bg-white"
          onChange={(e) => onChange({ lob: e.target.value })}
        >
          {LOB_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
