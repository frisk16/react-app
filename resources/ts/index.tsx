import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Web from "./router/Web";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import { UrlProvider } from "./providers/UrlProvider";

const root = createRoot(document.getElementById("app") as HTMLElement);

root.render(
    <StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <UrlProvider>
                    <Web />
                </UrlProvider>
            </ChakraProvider>
        </BrowserRouter>
    </StrictMode>
)