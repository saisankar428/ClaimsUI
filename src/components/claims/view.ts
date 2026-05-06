export type DataReadSource = "IBM_CM" | "FACETS" | "TRANSFORM";

export interface DataRead {
  source: DataReadSource;
  query: string;
  time: string;
  passed: boolean;
}

export interface LookupTable {
  headers: string[];
  rows: string[][];
}

export interface SopBranch {
  label: string;
  matched: boolean;
  children: SopStep[];
}

export interface SopStep {
  id: string;
  question: string;
  reads: DataRead[];
  branches: SopBranch[];
  table?: LookupTable;
}

export type TimelineEventType =
  | "received"
  | "info"
  | "updated"
  | "pended"
  | "automated"
  | "accepted";

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  subtitle?: string;
  timestamp: string;
  userId?: string;
  isActive?: boolean;
}
