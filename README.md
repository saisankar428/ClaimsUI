# ClaimsUI

Claims adjudication dashboard built with React, Vite, and Ant Design.

## Tech Stack

- **React 19** — UI library
- **Vite** — build tool and dev server
- **Ant Design v5** — component library
- **React Router v6** — client-side routing
- **TypeScript** — type safety

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
claims-ui/
├── src/                  # App entry point and root components
│   ├── main.tsx
│   ├── App.tsx
│   ├── ErrorBoundary.tsx
│   └── index.css
├── components/claims/    # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript types
├── constants/            # Shared constants
└── data/                 # Mock data
```
