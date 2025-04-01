import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AiAssistantProvider } from "@sista/ai-assistant-react";


createRoot(document.getElementById("root")!).render(
  <AiAssistantProvider apiKey="pk-sista-577af3e9-2321-40e7-8d8d-b0d5182eca8a">
    <App />
  </AiAssistantProvider>
);
