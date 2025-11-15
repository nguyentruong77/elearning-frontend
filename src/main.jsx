import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";
//import { AuthProvider } from "./components/AuthContext/index.jsx";
import { Provider } from 'react-redux'
import { store } from "./stores/index.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      {/* <AuthProvider>
      </AuthProvider> */}
      <App />
    </Provider>
  </BrowserRouter>
  // </StrictMode>
);
