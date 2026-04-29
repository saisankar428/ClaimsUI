// Shimmer skeleton that exactly mirrors the table column structure.
// Rendered in place of the table during loading so layout never shifts.
const SKELETON_ROWS = 8;

// Employer column varies per row so the shimmer feels natural, not robotic.
const EMPLOYER_WIDTHS = ["w-32", "w-40", "w-48", "w-36", "w-44", "w-32", "w-40", "w-36"];

function ShimmerBar({ className }: { className: string }) {
  return <div className={`h-3.5 rounded bg-gray-200 animate-pulse ${className}`} />;
}

export default function ClaimsTableSkeleton() {
  return (
    <table className="w-full text-left">
      <thead className="text-sm text-gray-500 border-b sticky top-0 bg-white">
        <tr>
          <th className="py-2 pr-4 font-medium">Claim ID</th>
          <th className="pr-4 font-medium">SCCF</th>
          <th className="pr-4 font-medium">Employer</th>
          <th className="pr-4 font-medium">LOB</th>
          <th className="pr-4 font-medium">Date</th>
          <th className="font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
          <tr key={i} className="border-b">
            <td className="py-3 pr-4"><ShimmerBar className="w-24" /></td>
            <td className="pr-4"><ShimmerBar className="w-16" /></td>
            <td className="pr-4"><ShimmerBar className={EMPLOYER_WIDTHS[i % EMPLOYER_WIDTHS.length]} /></td>
            <td className="pr-4"><ShimmerBar className="w-16" /></td>
            <td className="pr-4"><ShimmerBar className="w-20" /></td>
            <td><ShimmerBar className="w-14" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
