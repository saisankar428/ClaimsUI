import { useEffect, useState } from "react";
import type { ClaimItem, UseClaimsData, UseClaimsParams } from "@/types/claims";

export type { ClaimItem, UseClaimsData, UseClaimsParams };

const ALL_CLAIMS: ClaimItem[] = [
  {
    id: "CLM-2839145",
    sccfNumber: "20114603",
    employerGroup: "Microsoft",
    lob: "BC Home",
    dateReceived: "Apr 22, 2026",
    status: "Complete",
    automation: 80,
  },
  {
    id: "CLM-2839215",
    sccfNumber: "20114692",
    employerGroup: "Alaska Air Group",
    lob: "BC Home",
    dateReceived: "Apr 21, 2026",
    status: "Complete",
    automation: 55,
  },
  {
    id: "CLM-2839263",
    sccfNumber: "20114744",
    employerGroup: "LifeWise of Washington",
    lob: "Shared Admin",
    dateReceived: "Apr 21, 2026",
    status: "Complete",
    automation: 90,
  },
  {
    id: "CLM-2839288",
    sccfNumber: "20114782",
    employerGroup: "Amazon",
    lob: "BC Home",
    dateReceived: "Apr 20, 2026",
    status: "Complete",
    automation: 40,
  },
  {
    id: "CLM-2839322",
    sccfNumber: "20114836",
    employerGroup: "Expedia",
    lob: "BC Home",
    dateReceived: "Apr 20, 2026",
    status: "Active",
    automation: 70,
  },
  {
    id: "CLM-2839378",
    sccfNumber: "20114895",
    employerGroup: "LEOFF Health and Welfare Trust",
    lob: "Host",
    dateReceived: "Apr 20, 2026",
    status: "Active",
    automation: 60,
  },
];

export const useClaims = (params: UseClaimsParams) => {
  const paramsJSON = JSON.stringify(params);
  const [data, setData] = useState<UseClaimsData>({ items: [], totalPages: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setLoading(true), 0);

    const fetchTimer = window.setTimeout(() => {
      let filtered = ALL_CLAIMS;

      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.id.toLowerCase().includes(q) ||
            c.employerGroup.toLowerCase().includes(q)
        );
      }

      if (params.lob) {
        filtered = filtered.filter((c) => c.lob === params.lob);
      }

      if (params.status) {
        filtered = filtered.filter((c) => c.status === params.status);
      }

      const totalPages = Math.max(1, Math.ceil(filtered.length / params.limit));
      const start = (params.page - 1) * params.limit;
      const items = filtered.slice(start, start + params.limit);

      setData({ items, totalPages });
      setLoading(false);
    }, 300);

    return () => {
      window.clearTimeout(loadingTimer);
      window.clearTimeout(fetchTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsJSON]);

  return { data, loading };
};
