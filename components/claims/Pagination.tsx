"use client";

type Props = {
  page: number;
  total: number;
  onChange: (page: number) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (rows: number) => void;
};

export default function Pagination({
  page,
  total,
  onChange,
  rowsPerPage = 15,
  onRowsPerPageChange,
}: Props) {
  return (
    <div className="flex items-center justify-between pt-3 px-1 border-t border-gray-100 mt-2 shrink-0">

      {/* Left: Rows per page — number input with visible up/down stepper */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="whitespace-nowrap">Rows per page</span>
        <input
          type="number"
          min={5}
          max={100}
          step={5}
          value={rowsPerPage}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 5 && val <= 100) onRowsPerPageChange?.(val);
          }}
          className="w-14 border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 text-center
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Right: Prev / Page X of Y / Next */}
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-200
                     hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
          >
            <path d="M9 10.5L5.5 7L9 3.5" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Prev
        </button>

        <span className="text-sm text-gray-600 whitespace-nowrap select-none">
          Page <strong className="text-gray-800 font-semibold">{page}</strong> of{" "}
          <strong className="text-gray-800 font-semibold">{total}</strong>
        </span>

        <button
          disabled={page === total}
          onClick={() => onChange(page + 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-200
                     hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
          >
            <path d="M5 3.5L8.5 7L5 10.5" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    </div>
  );
}
