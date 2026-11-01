# ANSHUVO

**[Visit the live ANSHUVO store](https://anshuvo.onrender.com/)**

A responsive demo shopping application built with React, Vite, Express, and SQLite. Browse products, manage a cart and wishlist, place demonstration orders, and manage the store through an admin dashboard.

**This is an educational project. No real payments are processed or products shipped. Use test details only.**

![ANSHUVO storefront](docs/anshuvo-desktop.jpg)

## Features

- Responsive storefront with ANSHUVO branding, product categories, search suggestions, filters, sorting, and deals.
- Product details, stock availability, reviews, and image fallbacks.
- Guest carts and account cart synchronization across sessions.
- Registration, sign-in, profile updates, saved addresses, and wishlists.
- Demo checkout, order confirmation, order history, and eligible order cancellation.
- Admin dashboard for products, inventory, orders, and customers.
- Shared UI styling, keyboard focus indicators, a skip-to-content link, and checkout validation that focuses the first invalid field.

## Technology

| Layer | Stack |
| --- | --- |
| Frontend | React 18, React Router 6, Vite 5 |
| Styling | Tailwind CSS 3, Lucide icons |
| API | Node.js 22, Express 4 |
| Database | SQLite through better-sqlite3 |
| Authentication | JWT sessions and bcrypt password hashing |
| Tests | Vitest, React Testing Library, Supertest, Node test runner, Python unittest |

## Run locally

Use **Node.js 22** and npm. The project also pins a local Node 22 runtime for npm scripts; using Node 22 for installation avoids native SQLite binary mismatches.

```bash
git clone https://github.com/Anshuman8705/Anshuvo.git
cd Anshuvo
npm ci
npm run dev
```

- Storefront: [localhost:5173](http://localhost:5173)
- API health check: [localhost:4000/api/health](http://localhost:4000/api/health)

The development command starts both servers. Vite forwards `/api` requests to Express on port 4000. SQLite initializes on first startup at `server/data/store.db`.

If switching Node versions causes a `NODE_MODULE_VERSION` error, activate Node 22 and run `npm ci` again.

### Optional configuration

Copy `.env.example` to `.env` in the project root and adjust as needed. Do not commit `.env` or database files.

| Variable | Purpose / development default |
| --- | --- |
| `PORT` | Express port; `4000` |
| `DB_PATH` | SQLite file; `server/data/store.db` |
| `JWT_SECRET` | Session-signing secret; set a strong private value for hosted use |
| `ADMIN_EMAIL` | Seeded demo administrator; `admin@example.com` |
| `ADMIN_PASSWORD` | Seeded demo administrator password; `admin123` |
| `VITE_API_BASE` | Optional API origin, set before building a separately hosted frontend |
| `VITE_BASE` | Optional frontend URL base path, set before building |

The default administrator credentials are for local demonstrations only. Configure credentials before the first database initialization. Changing the environment password does not reset an existing account's password.

### Demo checkout

Use a test card number such as `4242 4242 4242 4242`, a future expiry such as `12/40`, and test security code `123`. Do not enter real payment information. Orders are recorded and stock changes, but no payment is taken.

The active storefront uses **USD demo prices**, free delivery, and an illustrative 8% tax calculation. These are demonstration rules, not production tax or payment integrations.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start frontend and API in development |
| `npm run build` | Create the production frontend in `dist/` |
| `npm start` | Run Express and serve the built frontend |
| `npm test` | Run the active app suite and the separate India-package suite |
| `npm run test:app` | Run storefront, API, validation, and cart tests |
| `npm run test:india` | Run tests for the separate India migration package |
| `npm run test:watch` | Watch the active app tests |
| `python -m unittest discover -s tests -p "test_*.py"` | Test the legacy updater using temporary fixtures |
| `npm run seed` | **Reset the database** and reload sample products; deletes existing demo accounts, orders, and reviews |

## Verification

Local verification on November 1, 2026:

- 45 active application tests passed, including a cart-restoration regression test.
- 43 separate India-package tests and 8 Python updater tests passed.
- 13 focused storefront/cart regression checks passed after final UI fixes.
- Production build and normal `npm start` health check passed.
- Browser checks covered desktop and phone layouts, search, mobile filters, cart, demo checkout, orders, account, wishlist, and administration screens. Phone layouts were checked at 320 and 375 pixels wide.

These are local results, not a claim of production certification. GitHub Actions runs the JavaScript tests and build for new changes.

## Project structure

```text
src/                  Active React application and frontend tests
server/               Express API, SQLite schema, routes, and API tests
public/images/        Product images, banners, and ANSHUVO logos
scripts/              Build and asset utilities
tests/                Separate India-package and Python updater tests
files/                Unapplied legacy India migration package
docs/                 Preview and historical migration documentation
.github/workflows/    CI and frontend deployment workflows
```

## Hosting

For the complete app, run `npm ci`, `npm run build`, and `npm start` on a Node 22 host with a **persistent writable disk** for SQLite. Configure the database path, signing secret, and administrator credentials. The included Render configuration uses a free instance; its local filesystem must not be treated as durable storage.

GitHub Pages serves only static files and cannot run Express or SQLite. The included Pages workflow publishes the frontend; a functional deployed shop also needs a separately hosted API and a build-time `VITE_API_BASE` value. The Vercel rewrite file is likewise not a deployment of the Express backend.

This repository remains a demo application. Public production use needs additional security and operational work, including a review of authentication, guest-order access, abuse controls, backups, and payment handling.

## Legacy India update package

The `files/`, `apply_update.py`, `patches.py`, and `MANIFEST.json` files belong to an earlier, **unapplied** India localization package. Their tests do not mean the live app uses INR. Historical instructions are preserved in [docs/legacy-india-update.md](docs/legacy-india-update.md).

Do not apply that updater over the current storefront without reviewing compatibility. Do not relabel existing USD prices or historical orders as INR. Some older root-level test notes also describe that earlier package; the commands and active-app description above take precedence.

## Author and license

Built by **Anshuman Agrawal**. Licensed under the [MIT License](LICENSE). This project is not affiliated with Amazon or any other retailer.
