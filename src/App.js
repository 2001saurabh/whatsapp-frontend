import { GoogleOAuthProvider } from "@react-oauth/google";
import Messanger from "./components/Messanger"; // default export statement
import AccountProvider from "./context/AccountProvider";

function App() {
  const clientId =
    "359674487640-fh9gefvc011jaoic0706gcmaus96lkev.apps.googleusercontent.com";
  const clientSecret = "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";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        {/* childeren */}
        <Messanger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
