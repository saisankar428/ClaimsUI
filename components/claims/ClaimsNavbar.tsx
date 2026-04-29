"use client";

import { useState } from "react";

const tabs = ["List", "View", "Complete"];

export default function ClaimsNavbar() {
  const [active, setActive] = useState("List");

  return (
    <div className="w-full bg-white px-4 py-3 sm:px-6 border-b">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        {/* Left: Title */}
        <div className="text-xl font-semibold text-slate-900">
          Claims Adjudication
        </div>

        {/* Right: Tabs — shared gray container, active tab is blue pill */}
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 gap-0.5">
          {tabs.map((tab) => {
            const isActive = active === tab;

            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`
                  px-4 py-1.5 text-sm font-medium rounded-md transition-all
                  ${isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"}
                `}
              >
                {tab}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
