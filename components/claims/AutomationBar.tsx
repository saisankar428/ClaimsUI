"use client";

export default function AutomationBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-orange-200 h-2 rounded-sm overflow-hidden">
      <div
        className="bg-blue-200 h-2"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}