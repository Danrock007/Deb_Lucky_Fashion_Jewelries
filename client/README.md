# Deb_Lucky_Fashion_Jewelries

Website for **Deb Lucky Fashion Jewelries** — a luxury jewellery brand. Built with React + Vite for fast development and a smooth, elegant browsing experience.

## Tech Stack

- **React** — component-based UI
- **Vite** — fast dev server & build tooling with HMR
- **Oxlint** — linting

## Getting Started

From the repository root, install the workspace dependencies and start the client:

```bash
npm install
npm run dev
```

## Production build

Set `VITE_API_URL` to the backend API origin (including `/api`) when the
frontend and backend are hosted on different origins. For a same-origin
deployment, leave it as `/api` and configure the web server to proxy `/api/`
to Django. See `.env.example` for the build-time variable.

The storefront does not bundle payment credentials. Paystack transactions are
initialized and verified by Django using the server-only `PAYSTACK_SECRET_KEY`.

## Notes

For TypeScript support and type-aware linting, see the [Vite TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts).