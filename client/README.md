# Deb_Lucky_Fashion_Jewelries

Website for **Deb Lucky Fashion Jewelries** — a luxury jewellery brand. Built with React + Vite for fast development and a smooth, elegant browsing experience.

## Tech Stack

- **React** — component-based UI
- **Vite** — fast dev server & build tooling with HMR
- **Oxlint** — linting

## Getting Started

The storefront reads products and categories from the Django backend and
prepares/verifies Paystack orders through it. Contact form messages open in
WhatsApp and do not use the backend. Run the backend and storefront in
separate terminals.

First, from the backend repository root, install its requirements and start
Django:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

Then, from this repository root, install the workspace dependencies and start
the client:

```bash
npm install
npm run dev
```

`client/.env.example` sets `VITE_API_URL=/api` and leaves
`VITE_WHATSAPP_NUMBER` empty. Vite proxies API requests to
`http://localhost:8000`, so no cross-origin configuration is needed for local
development. Populate the catalog through Django admin at
`http://localhost:8000/admin/`; configure Paystack and contact email settings
in the backend environment to enable payments. Customer registration sends an
email verification link; configure backend SMTP and set
`ACCOUNT_VERIFICATION_URL` to the storefront's `/account/verify` URL.

## WhatsApp contact

Before launch, set `VITE_WHATSAPP_NUMBER` in `client/.env.local` to the
business WhatsApp number using digits only, including the country code and
without a local leading zero (for example, `233XXXXXXXXX`). Restart Vite
after changing it. If this setting is empty, the contact form uses the
placeholder `+233 20 000 0000`; replace it with the real number before launch.
An invalid nonempty value disables the chat button and displays a warning.
Update the displayed contact phone and email in `src/pages/Contact.jsx` if the
business details change.

The number is embedded at build time. For a Docker build, pass it as a build
argument:

```bash
docker build --build-arg VITE_WHATSAPP_NUMBER=YOUR_NUMBER -t deb-lucky-client client
```

Rebuild production deployments after changing the number.

## Production build

Set `VITE_API_URL` to the backend API origin (including `/api`) when the
frontend and backend are hosted on different origins. For a same-origin
deployment, leave it as `/api` and configure the web server to proxy `/api/`
to Django. See `.env.example` for the build-time variable.

The storefront does not bundle payment credentials. Paystack transactions are
initialized and verified by Django using the server-only `PAYSTACK_SECRET_KEY`.

## Notes

For TypeScript support and type-aware linting, see the [Vite TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts).