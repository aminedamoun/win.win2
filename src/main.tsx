import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./App";
import { initI18nRemote } from "./i18nRemote";

async function bootstrap() {
  try {
    await initI18nRemote();
  } catch (e) {
    console.error("i18nRemote init failed, continuing with keys:", e);
  }

  const rootEl = document.getElementById("root");
  if (!rootEl) throw new Error("#root not found");

  ReactDOM.createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

bootstrap();
