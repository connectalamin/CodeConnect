

import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <QueryClientProvider client={queryClient}>
      
    <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
    </MantineProvider>
    </QueryClientProvider>
   

);