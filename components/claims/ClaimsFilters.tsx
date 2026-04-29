"use client";

import { useState } from "react";

type ClaimsFilters = {
  search?: string;
  lob?: string;
};

type Props = {
  onChange: (filters: ClaimsFilters) => void;
};

const tabs = ["Active", "Complete"];

export default function ClaimsFilters({ onChange }: Props) {
  const [active, setActive] = useState("Active");

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4 mt-5 mx-5">
      
      {/* Tabs */}
      <div className="flex rounded-lg bg-slate-600 overflow-hidden">
        {tabs.map((tab, index) => {
          const isActive = active === tab;

          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`
                px-4 py-2 text-sm font-medium transition
                ${isActive ? "text-blue-600 bg-slate-200 font-semibold" : "text-slate-600 bg-white hover:bg-slate-200 font-semibold"}
                ${index === 0 ? "rounded-l-lg" : ""}
                ${index === tabs.length - 1 ? "rounded-r-lg" : ""}
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative w-full lg:w-80">
        {/* Icon */}
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search claim ID or employer group"
          className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            onChange({ search: e.target.value })
          }
        />
      </div>

      {/* LOB Label + Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">
          LOB
        </span>

        <select
          className="border rounded-lg px-3 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            onChange({ lob: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="BC Home">BC Home</option>
          <option value="Shared Admin">Shared Admin</option>
        </select>
      </div>
    </div>
  );
}