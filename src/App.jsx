import axios from "axios";
import { useEffect, useState } from "react";
import UserData from "./UserData";
// import dotenv from "dotenv";
// dotenv.config();

// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;
// const redirectUri = process.env.REDIRECT_URI;
// const scope = process.env.SCOPE;
const clientId = "121762";
const clientSecret = "9cc85ab3c82a68efe379aa7c996ecb4ff3c3c190";
const redirectUri = "http://localhost:5173";
const scope = "read_all";

const App = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [authHandled, setAuthHandled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [athleteStats, setAthleteStats] = useState(null);

  const fetchAthleteStats = async (id, token) => {
    try {
      const AtheleteRes = await axios.get(
        `https://www.strava.com/api/v3/athletes/${id}/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Athlete Stats:", AtheleteRes.data);
      setAthleteStats(AtheleteRes.data);
    } catch (error) {
      console.error("Error fetching athlete stats:", error);
    }
  };
  const fetchAthleteData = async (token) => {
    try {
      const Response = await axios.get(
        "https://www.strava.com/api/v3/athlete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User Data:", Response.data);
      setUserData(Response.data);
      console.log(Response.data.id);
      fetchAthleteStats(Response.data.id, token);
    } catch (error) {
      console.error("Error fetching athlete data:", error);
    }
  };

  const exchangeAuthorizationForToken = async (authorizationCode) => {
    try {
      const tokenResponse = await axios.post(
        "https://www.strava.com/oauth/token",
        {
          client_id: clientId,
          client_secret: clientSecret,
          code: authorizationCode,
        }
      );

      console.log("Token Exchange Response:", tokenResponse.data);
      setAccessToken(tokenResponse.data.access_token);
      localStorage.setItem("accessToken", tokenResponse.data.access_token);

      // Fetch athlete data after obtaining the access token
      fetchAthleteData(tokenResponse.data.access_token);
    } catch (error) {
      console.error("Authorization Error:", error);
      console.log("Detailed Error:", error.response);
      // Handle errors as needed
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
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      fetchAthleteData(storedAccessToken);
    } else {
      handleAuthenticationCallback();
    }
  }, []);

  const handleConnect = () => {
    const authorizationUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = authorizationUrl;
  };

  return (
    <div>
      {accessToken ? (
        <>
          {userData && athleteStats ? (
            <>
              <UserData userData={userData} athleteStats={athleteStats} />
            </>
          ) : (
            <>
              <p>Loading user data...</p>
            </>
          )}
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default App;
