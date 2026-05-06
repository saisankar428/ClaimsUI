import React from "react";
// ── Icons ──

import { TimelineEvent, TimelineEventType } from "./view";

function IconReceived() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function IconPerson() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function IconLightning() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

// ── Config ───

const EVENT_CONFIG: Record<
  TimelineEventType,
  { icon: React.ReactNode; bg: string; color: string; border: string }
> = {
  received: {
    icon: <IconReceived />,
    bg: "#eff6ff",
    color: "#2563eb",
    border: "#bfdbfe",
  },
  info: {
    icon: <IconInfo />,
    bg: "#f9fafb",
    color: "#6b7280",
    border: "#e5e7eb",
  },
  updated: {
    icon: <IconPerson />,
    bg: "#f9fafb",
    color: "#6b7280",
    border: "#e5e7eb",
  },
  pended: {
    icon: <IconPerson />,
    bg: "#f9fafb",
    color: "#6b7280",
    border: "#e5e7eb",
  },
  automated: {
    icon: <IconLightning />,
    bg: "#2563eb",
    color: "#fff",
    border: "#1d4ed8",
  },
  accepted: {
    icon: <IconPerson />,
    bg: "#f9fafb",
    color: "#6b7280",
    border: "#e5e7eb",
  },
};

// ── Header Button Config ───

const HEADER_BUTTONS = [
  { icon: <IconInfo />, title: "Info" },
  { icon: <IconPerson />, title: "Users" },
  { icon: <IconLightning />, title: "Automated" },
];

// ── Event Card ───

const EventCard = React.memo(function EventCard({ event }: { event: TimelineEvent }) {
  const isActive = event.isActive;

  return (
    <div
      style={{
        background: isActive ? "#eff6ff" : "#fff",
        border: `1px solid ${isActive ? "#bfdbfe" : "#e5e7eb"}`,
        borderRadius: 8,
        padding: "10px 14px",
        flex: 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: isActive ? "#1d4ed8" : "#111827",
            lineHeight: 1.4,
          }}
        >
          {event.title}
        </span>
        <span style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap", flexShrink: 0, marginTop: 1 }}>
          {event.timestamp}
        </span>
      </div>

      {(event.subtitle || event.userId) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
          {event.subtitle && (
            <span style={{ fontSize: 12, color: isActive ? "#2563eb" : "#6b7280", lineHeight: 1.4 }}>
              {event.subtitle}
            </span>
          )}
          {event.userId && (
            <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: "auto", flexShrink: 0 }}>
              {event.userId}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

// ── Main Component ────

interface TimelinePanelProps {
  events: TimelineEvent[];
}

export default function TimelinePanel({ events }: TimelinePanelProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#fff",
        minWidth: 0,
      }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 1, textTransform: "uppercase" }}>
          Adjudication Timeline
        </span>

        {/* Placeholder icon buttons */}
        <div style={{ display: "flex", gap: 4 }}>
          {HEADER_BUTTONS.map(({ icon, title }) => (
            <button
              key={title}
              title={title}
              style={{
                width: 30,
                height: 30,
                borderRadius: 6,
                border: "1px solid #e5e7eb",
                background: "#f9fafb",
                color: "#6b7280",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable timeline */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 14px",
        }}
      >
        {events.map((event, i) => {
          const config = EVENT_CONFIG[event.type];
          const isLast = i === events.length - 1;

          return (
            <div key={event.id} style={{ display: "flex", gap: 10, position: "relative" }}>
              {/* Icon + vertical line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: config.bg,
                    border: `1.5px solid ${config.border}`,
                    color: config.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  {config.icon}
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div
                    style={{
                      width: 1.5,
                      flex: 1,
                      minHeight: 12,
                      background: "#e5e7eb",
                      marginTop: 3,
                      marginBottom: 3,
                    }}
                  />
                )}
              </div>

              {/* Event card */}
              <div style={{ flex: 1, paddingBottom: isLast ? 0 : 8, minWidth: 0 }}>
                <EventCard event={event} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
