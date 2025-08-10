

import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from "./App";

// Register service worker (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(reg => {
            console.log('[PWA] SW registered', reg.scope);
        }).catch(err => console.error('[PWA] SW registration failed', err));
    });
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <QueryClientProvider client={queryClient}>
      
    <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      
    </MantineProvider>
    </QueryClientProvider>
   

);