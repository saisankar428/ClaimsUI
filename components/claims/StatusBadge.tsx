"use client";

export default function StatusBadge({ status }: { status: string }) {
  const isComplete = status === "Complete";

  const styles = isComplete
    ? "bg-green-50 text-green-800 border-gray-200"
    : "bg-yellow-50 text-yellow-800 border-yellow-200";

  return (
    <span
      className={`
        inline-flex items-center
        px-4 py-[0.5px]
        text-sm font-semibold
        rounded-sm
        border-[1.5px]
        ${styles}
      `}
    >
      {status}
    </span>
  );
}