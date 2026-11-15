# Showman Tailors

Showman Tailors is a desktop application built with Electron, React, and Vite for managing tailoring-shop customers and jobs.

## Features

- Sign in and create administrator accounts.
- Create and update customer and employee records.
- Create tailoring jobs with customer measurements, garment details, prices, and return dates.
- Find and review jobs on the dashboard using customer-name or date searches.
- View job receipts in a separate window and print them.
- Back up and restore application data.
- View and update shirt and pant prices.

## Application workflow

1. Sign in with an account registered through the app.
2. Use the dashboard to search existing jobs, or use the application menu to open customer, employee, job, and price screens.
3. Create a job by selecting or entering customer details, adding measurements and garment information, then submitting it with a return date.
4. Open a job receipt from the job list to review or print it.
5. Use Backup/Restore to download a ZIP backup or select a backup file to restore.

The app uses hash-based routes so it can load the same React screens in development and from the packaged `dist/index.html`.

## Requirements

- Node.js and npm.
- The Showman backend API must be running and reachable by the desktop app.

### Backend URL

The API URLs are declared in `src/utils/Data/BaseURL.js`. `sendRequest` in `src/utils/Helpers/HelpersMethod.js` currently defaults to the test URL, `http://localhost:4000`, because its `test` argument defaults to `true`. To use the deployed backend, change that default to `false` (or explicitly pass `false` for requests); the production URL is declared in the same `BaseURL.js` file. Ensure the selected API is available before signing in.

## Install dependencies

```sh
npm install
```

## Run in development

Start the Vite development server and Electron together:

```sh
npm run dev
```

The app waits for Vite at `http://localhost:5173` before opening Electron.

For frontend-only development, run `npm run dev:vite`. To open Electron separately, start Vite first and then run `npm run electron`.

## Build the desktop app

```sh
npm run build
```

This runs the Vite production build and then packages the application with Electron Builder. The package configuration currently targets a Windows NSIS installer. Output is written to `release`; the installer allows choosing an installation directory and creates desktop and Start Menu shortcuts.

## Project structure

- `src/pages/` contains the login, dashboard, customer, employee, job measurement, pricing, printing, and backup/restore screens.
- `src/components/` contains reusable interface components and dashboard/job form elements.
- `src/utils/` contains API request helpers, API URLs, initial form values, and validation.
- `electron/main.js` manages the application windows and renderer-to-main-process IPC.
- `electron/component.js` defines the application and print-window menus.
- `vite.config.js` configures the React and Tailwind CSS Vite plugins.

## Lint

```sh
npm run lint
```

## Notes

- Customer, employee, job, pricing, login, and backup data operations use the backend API; the desktop app is not a standalone local database.
- Backup downloads a ZIP file containing `data.json`. Restore opens a file picker and sends the selected path to the backend restore endpoint.
- Salary and Payment menu entries are currently disabled in the application menu.

## React + Vite template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
