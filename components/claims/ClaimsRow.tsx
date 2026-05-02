"use client";

import StatusBadge from "./StatusBadge";
import AutomationBar from "./AutomationBar";
import { ClaimItem } from "@/types/claims";

export default function ClaimsRow({ item }: { item: ClaimItem }) {
  return (
    <tr className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer">
      <td className="p-3 font-semibold text-black">{item.id}</td>
      <td className="p-3 font-semibold text-gray-700 opacity-60">{item.sccfNumber}</td>
      <td className="p-3 font-semibold text-black">{item.employerGroup}</td>
      <td className="p-3 font-semibold text-black">{item.lob}</td>
      <td className="p-3 font-semibold text-black">{item.dateReceived}</td>

      <td className="p-3">
        <StatusBadge status={item.status} />
      </td>

      <td className="p-3">
        <AutomationBar value={item.automation} />
      </td>
    </tr>
  );
}