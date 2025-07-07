import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from './context/AuthProvider';
// this should now work

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
