"use client";

import { useState } from "react";

const tabs = ["List", "View", "Complete"];

export default function ClaimsNavbar() {
  const [active, setActive] = useState("List");

  return (
    <div className="w-full bg-white px-4 py-3 sm:px-6 border-b">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Left: Title */}
        <div className="text-lg font-semibold text-slate-900">
          Claims Adjudication
        </div>

        {/* Right: Tabs */}
        <div className="flex rounded-lg bg-slate-100 overflow-hidden">
          {tabs.map((tab, index) => {
            const isActive = active === tab;

            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`
                  px-4 py-2 text-sm font-medium transition
                  ${isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-200"}
                  
                  ${index === 0 ? "rounded-l-lg" : ""}
                  ${index === tabs.length - 1 ? "rounded-r-lg" : ""}
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