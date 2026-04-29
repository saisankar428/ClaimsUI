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
  status?: string;
};

export type ClaimsFilterValues = {
  search?: string;
  lob?: string;
  status?: string;
};
