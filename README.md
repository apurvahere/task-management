# Task List Web Application (React + TypeScript + Vite)

### Getting Started

## Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   # or
   yarn
   ```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You can start editing the page by modifying `app.tsx`. The page auto-updates as you edit the file.

## Mock API with Mock Service Worker (MSW)

### Overview

This project uses **[Mock Service Worker (MSW)](https://mswjs.io/)** to mock API calls during development and testing. MSW allows us to simulate backend responses so that the frontend can be developed and tested **without a real server**.

> **Note:** MSW automatically starts when the React development server starts. No extra port or server is needed.

```
src/
 └─ mocks/
     ├─ handlers.ts       # Define all API endpoints
     └─ browser.ts        # Configure the service worker
```

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

```bash
npm run build
# or
yarn run build
```

## Tech stack

- **[React JS](https://reactjs.org/)**
- **[Vite](https://vitejs.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Redux Toolkit](https://redux-toolkit.js.org/)**
- **[Jest](https://jestjs.io/)**

## Third-Party Libraries

The project utilizes the following third-party libraries and tools:

- **[react](https://reactjs.org):** A JavaScript library for building user interfaces.
- **[react-dom](https://reactjs.org/docs/react-dom.html):** Provides DOM-specific methods for React.
- **[react-icons](https://react-icons.github.io/react-icons):** A library for including scalable icons in React.
- **[react-router-dom](https://reactrouter.com/en/main):** A collection of navigational components for React applications.
- **[tailwindcss](https://tailwindcss.com):** A utility-first CSS framework for rapidly building custom user interfaces.
- **[eslint](https://eslint.org):** A tool for identifying and fixing problems in JavaScript and TypeScript code.
- **[typescript](https://www.typescriptlang.org):** A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **[Jest](https://jestjs.io/)** – A robust testing framework for JavaScript and TypeScript. It provides unit, integration, and snapshot testing for your React components and Redux slices.
- **[Formik](https://formik.org/)** – Form handling and validation
- **[Yup](https://github.com/jquense/yup)** – Schema validation for forms
- **[React Hot Toast](https://react-hot-toast.com/)** – Lightweight toast notifications
- **[React Loader Spinner](https://mhnpd.github.io/react-loader-spinner/)** – Loading spinners for React
- **[MSW (Mock Service Worker)](https://mswjs.io/)** – Intercepts network requests and mocks API responses during development and testing. This allows you to develop and test your app without depending on real backend APIs.
- **[Axios](https://axios-http.com/)** with **Interceptors** – Axios is used for making HTTP requests. Interceptors allow you to handle common request/response logic globally, such as:
  - Adding authentication tokens to headers
  - Handling API errors consistently
  - Logging or modifying requests and responses automatically
- **[Prettier](https://prettier.io/)** – Code formatter for consistent and readable code styling across the project. It works together with ESLint to ensure both code quality and style uniformity.
