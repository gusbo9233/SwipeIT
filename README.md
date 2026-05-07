# SwipeIT

SwipeIT is a modern, swipe-based matching platform built with React, TypeScript, and Vite. It connects candidates and recruiters through intuitive onboarding, profile management, and search experiences designed for fast, engaging hiring workflows.

## Features

- Role-based authentication for candidates and recruiters
- Swipe-style candidate discovery interface
- Candidate and recruiter profile creation and preferences setup
- Search and filtering to find matching candidates or jobs
- Responsive UI with reusable components and state management
- Built with TypeScript, Vite, and React

## Project Structure

- `src/`
  - `components/` — reusable UI components, search/swipe views, profile forms
  - `context/` — app-wide state providers and authentication context
  - `data/` — sample JSON data stores and storage helpers
  - `pages/` — main application pages and routing screens
  - `service/` — authentication and app service logic
  - `types/` — TypeScript interfaces and models

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 10 or newer

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL shown in the terminal to view the app.

## Build

```bash
npm run build
```

## Test

This project does not include automated tests by default. You can add your own test runner and configuration as needed.

## Notes

- The app appears to use local JSON data files for sample accounts, candidates, recruiter profiles, and skills.
- Authentication and profile flows are implemented in the `src/pages/` and `src/components/` modules.
- You can customize the UI and add backend integration for persistence and real authentication.

## License

This repository is available under the terms of the MIT License, unless otherwise specified.
