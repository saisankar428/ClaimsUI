import { SopStep, TimelineEvent } from "./view";

export const MOCK_SOP_STEPS: SopStep[] = [
  {
    id: "1",
    question: "Is the claim a Professional claim type?",
    reads: [
      {
        source: "IBM_CM",
        query: "claim_type is 'Professional'",
        time: "01:03:00 AM",
        passed: true,
      },
    ],
    branches: [
      {
        label: "Yes",
        matched: true,
        children: [
          {
            id: "1-1",
            question: "Is the date of service within the plan year?",
            reads: [
              {
                source: "FACETS",
                query: "service_date between plan_start and plan_end",
                time: "01:03:05 AM",
                passed: true,
              },
            ],
            branches: [
              {
                label: "Yes",
                matched: true,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    question: "Is the member eligible on the date of service?",
    reads: [
      {
        source: "FACETS",
        query: "member_eligibility is 'Active'",
        time: "01:03:08 AM",
        passed: true,
      },
    ],
    branches: [
      {
        label: "Yes",
        matched: true,
        children: [],
      },
    ],
  },
  {
    id: "3",
    question:
      "Is billing provider name like 'Crossover' and billing provider tin = '272210284'?",
    reads: [
      {
        source: "IBM_CM",
        query:
          "billing_provider_name is 'CROSSOVER',\nbilling_provider_tin is '272210284'",
        time: "01:03:13 AM",
        passed: true,
      },
    ],
    branches: [
      {
        label: "Yes",
        matched: true,
        children: [
          {
            id: "3-1",
            question: "Which Submitter applies?",
            reads: [
              {
                source: "FACETS",
                query: "submitter is 'Provider'",
                time: "01:03:17 AM",
                passed: true,
              },
            ],
            branches: [
              {
                label: "Provider",
                matched: true,
                children: [
                  {
                    id: "3-1-1",
                    question:
                      "Get Box 33 from IBM CM (save as Clinic Location).",
                    reads: [
                      {
                        source: "IBM_CM",
                        query: "clinic_location is\n'Crossover Las Colinas'",
                        time: "01:03:22 AM",
                        passed: true,
                      },
                    ],
                    branches: [],
                  },
                  {
                    id: "3-1-2",
                    question:
                      "Match Clinic Location → column Clinic in the lookup table (contains match); save Provider ID as Billing Provider Id?",
                    reads: [
                      {
                        source: "TRANSFORM",
                        query: "billing_provider_id is\n'B03A80B03A80'",
                        time: "01:03:26 AM",
                        passed: true,
                      },
                    ],
                    branches: [],
                    table: {
                      headers: ["CLINIC", "PROVIDER ID"],
                      rows: [
                        ["Crossover Duncanville", "B03Z7RB03Z7R"],
                        ["Crossover Grapevine", "B03Z7DB03Z7D"],
                        ["Crossover Garland", "B03Z7KB03Z7K"],
                        ["Crossover High Crest", "B03Z4B03Z4"],
                        ["Crossover Las Colinas", "B03A80B03A80"],
                        ["Crossover Plano", "B03Z9CB03Z9C"],
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    question: "Is the Place of Service code valid for this claim type?",
    reads: [
      {
        source: "IBM_CM",
        query: "place_of_service is '11'",
        time: "01:03:30 AM",
        passed: true,
      },
    ],
    branches: [
      {
        label: "Yes",
        matched: true,
        children: [],
      },
    ],
  },
];

export const MOCK_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    type: "received",
    title: "Received",
    timestamp: "Apr 20 at 11:42 PM",
  },
  {
    id: "2",
    type: "info",
    title: "Warnings: 0015",
    subtitle: "PCAs: P966, P510",
    timestamp: "Apr 21 at 01:00 AM",
  },
  {
    id: "3",
    type: "updated",
    title: "Updated",
    subtitle: "Duplicate bypass",
    timestamp: "Apr 21 at 09:15 AM",
    userId: "U1042",
  },
  {
    id: "4",
    type: "pended",
    title: "Pended",
    subtitle: "Pend: P966 · Note: Not trained on P966",
    timestamp: "Apr 21 at 02:30 PM",
    userId: "U1042",
  },
  {
    id: "5",
    type: "info",
    title: "Pend: P966",
    subtitle: "PCAs: P966, P510",
    timestamp: "Apr 22 at 01:00 AM",
  },
  {
    id: "6",
    type: "automated",
    title: "SOP Automated",
    subtitle: "P966, 8 steps, 1 field updated",
    timestamp: "Apr 22 at 01:03 AM",
    isActive: true,
  },
  {
    id: "7",
    type: "info",
    title: "Pend: P510",
    subtitle: "PCAs: P510",
    timestamp: "Apr 23 at 01:00 AM",
  },
  {
    id: "8",
    type: "updated",
    title: "Updated",
    subtitle: "4 fields updated",
    timestamp: "Apr 23 at 09:20 AM",
    userId: "U2087",
  },
  {
    id: "9",
    type: "accepted",
    title: "Accepted",
    timestamp: "Apr 23 at 04:05 PM",
    userId: "U2087",
  },
];
