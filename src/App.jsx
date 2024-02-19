import axios from "axios";
import { useEffect, useState } from "react";
import UserData from "./UserData";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;
const scope = import.meta.env.VITE_SCOPE;

const App = () => {
  // state varibles
  const [accessToken, setAccessToken] = useState("");
  // const [authorization_code, setauthorization_code] = useState("");

  // functions

  const exchageAuthorizationForToken = async (authorizationCode) => {
    console.log("exchageAuthorizationForToken✅");
    // console.log(authorizationCode);
    const tokenResponse = await axios.post(
      "https://www.strava.com/oauth/token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        grant_type: "authorization_code",
      }
    );
    console.log("tokenResponse", tokenResponse);
    // extract the accessToken
    // const accessToken = tokenResponse
  };

  const handleAuthenticationCallback = () => {
    console.log("handleAuthenticationCallback✅");
    try {
      // Parse the URL to extract the authorization code
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");
      console.log("authorizationCode", authorizationCode);
      if (authorizationCode) {
        console.log("authorizationCode✅");
        exchageAuthorizationForToken(authorizationCode);
      } else {
        console.error("Authorization code not found in URL");
      }
    } catch (err) {
      console.error("Error in handling authorization callback:", err);
    }
  };

  useEffect(() => {
    handleAuthenticationCallback();
  }, []);
  const handleConnect = () => {
    const authorizationUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = authorizationUrl;
  };

  return (
    <div className="bg-slate-600 w-full h-screen flex flex-col items-center justify-center">
      <h1
        id="headerText"
        className="w-3/5 text-2xl font-semibold  text-slate-50 tracking-wider"
      >
        StravaConnect
      </h1>

      <div className="bg-slate-200 w-3/5 h-3/5 p-12 flex flex-col items-center justify-between rounded-lg ">
        {/* <UserData /> */}

        <h1 className="w-full bg-slate-900 text-center text-2xl text-red-500 p-4 rounded-lg">
          Connect to Strava
        </h1>
        <button
          className="w-[90px] h-[30px] bg-green-600 text-xl text-white font-medium font-sans rounded-lg hover:brightness-110 active:translate-y-1 active:shadow-sm"
          onClick={handleConnect}
        >
          Connect
        </button>
      </div>
    </div>
  );
};
export default App;
