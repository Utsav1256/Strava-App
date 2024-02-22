import axios from "axios";
import { useEffect, useState } from "react";

const clientId = "121975";  // Replace with your actual client ID
const clientSecret = "3eb88fded0c20596ef609f8d7862faa253494615";  // Replace with your actual client secret
const redirectUri = "http://localhost:5173";  // Replace with your actual redirect URI
const scope = "read";  // Replace with your required scope

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [authHandled, setAuthHandled] = useState(false);
  const [Data, setData] = useState(null);

  const exchangeAuthorizationForToken = async (authorizationCode) => {
    try {
      const tokenResponse = await axios.post(
        "https://www.strava.com/oauth/token",
        {
          client_id: clientId,
          client_secret: clientSecret,
          code: authorizationCode,
          grant_type: "authorization_code",
        }
      );

      console.log("Token Exchange Response:", tokenResponse.data);
      setAccessToken(tokenResponse.data.access_token);

      // Fetch athlete data after obtaining the access token
      fetchAthleteData(tokenResponse.data.access_token);
    } catch (error) {
      console.error("Authorization Error:", error);
      console.log("Detailed Error:", error.response);
      // Handle errors as needed
    }
  };

  const fetchAthleteData = async (token) => {
    try {
      const Response = await axios.get("https://www.strava.com/api/v3/athlete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Athlete Data:", Response.data);
      setData(Response.data);
    } catch (error) {
      console.error("Error fetching athlete data:", error);
    }
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const tokenResponse = await axios.post(
        "https://www.strava.com/oauth/token",
        {
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }
      );

      console.log("Refresh Token Response:", tokenResponse.data);
      setAccessToken(tokenResponse.data.access_token);
      fetchAthleteData(tokenResponse.data.access_token);
    } catch (error) {
      console.error("Refresh Token Error:", error);
    }
  };

  const handleAuthenticationCallback = () => {
    try {
      if (!authHandled) {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get("code");

        if (authorizationCode) {
          exchangeAuthorizationForToken(authorizationCode);
        } else {
          console.error("Authorization code not found in URL");
        }

        setAuthHandled(true);
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
      <h1 className="w-3/5 text-2xl font-semibold text-slate-50 tracking-wider">
        StravaConnect
      </h1>
      <div className="bg-slate-200 w-3/5 h-3/5 p-12 flex flex-col items-center justify-between rounded-lg">
        <h1 className="w-full bg-slate-900 text-center text-2xl text-red-500 p-4 rounded-lg">
          Connect to Strava
        </h1>
        <button
          className="w-[90px] h-[30px] bg-green-600 text-xl text-white font-medium font-sans rounded-lg hover:brightness-110 active:translate-y-1 active:shadow-sm"
          onClick={handleConnect}
        >
          Connect
        </button>
        {Data && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-slate-800">User Data:</h2>
            <pre>{JSON.stringify(Data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
