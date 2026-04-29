import { useEffect, useState } from "react";

export type ClaimItem = {
  id: string;
  sccfNumber: string;
  employerGroup: string;
  lob: string;
  dateReceived: string;
  status: string;
  automation: number;
};

export type UseClaimsData = {
  items: ClaimItem[];
  totalPages: number;
};

export type UseClaimsParams = {
  page: number;
  search: string;
  lob: string;
  limit: number;
};

export const useClaims = (params: UseClaimsParams) => {
  const paramsJSON = JSON.stringify(params);
  const [data, setData] = useState<UseClaimsData>({
    items: [],
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => {
      setLoading(true);
    }, 0);

    const fetchTimer = window.setTimeout(() => {
      setData({
        items: [
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
            id: "CLM-2839288",
            sccfNumber: "20114604",
            employerGroup: "Amazon",
            lob: "Shared Admin",
            dateReceived: "Apr 23, 2026",
            status: "Pending",
            automation: 40,
          },
        ],
        totalPages: 3,
      });

      setLoading(false);
    }, 500);

    return () => {
      window.clearTimeout(loadingTimer);
      window.clearTimeout(fetchTimer);
    };
  }, [paramsJSON]);

  return { data, loading };
};