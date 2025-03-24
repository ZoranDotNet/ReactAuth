import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/Theme-provider";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
	<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ThemeProvider>
);
