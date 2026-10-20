# Note Manager — Frontend

A note management application built with Angular. Users can create, view, edit, and delete notes through a simple and responsive interface.

## Features

- Create, edit, view, and delete notes.
- Communicate with a REST API.
- Manage application state using NgRx Store and Effects.
- Switch between English and Ukrainian.
- Responsive user interface.
- End-to-end tests with Playwright.

## Tech Stack

- Angular 21
- TypeScript
- NgRx Store and Effects
- ngx-translate
- HTML and CSS
- Playwright

## Prerequisites

Make sure the following tools are installed:

- Node.js
- npm
- The Note Manager Backend API

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the Backend

Start the Note Manager Backend API separately. By default, the frontend expects the API to be available at:

`http://localhost:5071/notes`

If the API runs on a different address, update the API URL in `src/app/services/notes.service.ts`.

### 3. Start the Frontend

```bash
npm start
```

Open `http://localhost:4200` in your browser.

## Running Tests

### Build