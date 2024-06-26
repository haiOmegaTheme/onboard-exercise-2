import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@shopify/polaris/build/esm/styles.css";

import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

import { BrowserRouter } from "react-router-dom";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider i18n={enTranslations}>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
