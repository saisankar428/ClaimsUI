import ClaimsNavbar from "@/components/claims/ClaimsNavbar";
import ClaimsView from "@/components/claims/ClaimsView";

export default function ClaimsPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ClaimsNavbar />
      <ClaimsView />
    </div>
  );
}
