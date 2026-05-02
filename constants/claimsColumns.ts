import { SortKey } from "@/constants/claims"

export interface Column {
  label: string;
  key: SortKey;
}

export const CLAIMS_COLUMNS: Column[] = [
  { label: "Claim ID",       key: "id"            },
  { label: "SCCF",           key: "sccfNumber"    },
  { label: "Employer Group", key: "employerGroup" },
  { label: "LOB",            key: "lob"           },
  { label: "Date Received",  key: "dateReceived"  },
  { label: "Status",         key: "status"        },
  { label: "Automation",     key: "automation"    },
];