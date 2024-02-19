## Step1:

- Redirect Users to Strava Authorization Endpoint:
  -- When users want to connect their Strava account to our app, we need to redirect them to the Strava authorization endpoint. This will happen when users click on a "Connect" button in our app.
  -- When user clicks on "Connect",
  -- then, we need to handleConnect
  -- We construct the authorization URL (authorizationUrl) with the appropriate parameters, including the clientId, redirectUri, response_type, and scope.
  -- When the "Connect" button is clicked, the handleConnect function sets the window.location.href to the constructed authorization URL, effectively redirecting the user's browser to the Strava authorization page.
  -- After the user approves the authorization request on Strava's site, Strava will redirect the user back to the specified redirectUri with an `authorization code`.
  -- We will need to handle this redirect in your application and exchange the authorization code for an access token to complete the OAuth flow.
  -- You need to capture this authorization code and exchange it for an access token by making a request to the Strava token endpoint.

## Step 2:

-- After the user is redirected back to your application's redirect URI (specified as redirectUri in your code), Strava will include an authorization code as a query parameter in the URL.
-- You need to capture this authorization code and exchange it for an access token by making a request to the Strava token endpoint.
-- Extract the Authorization Code:
-- Parse the URL of the redirect URI to extract the authorization code from the query parameters. We can use JavaScript to parse the URL and extract the query parameters.

## Step 3:

Exchange Authorization Code for Access Token:
-- Once you have the authorization code, your application needs to make a request to the Strava token endpoint (https://www.strava.com/oauth/token) to exchange the authorization code for an access token.
-- This request should include your client ID, client secret, authorization code, and grant type (authorization_code).
-- Strava will respond with an access token that you can use to make authenticated requests to the Strava API on behalf of the user.

## Step2:

- Construct the Authorization URL:

-- To construct the authorization URL, we need to include several parameters in the URL query string. These parameters typically include:

--- client_id: Your application's client ID obtained from the Strava developer dashboard.
--- redirect_uri: The URI to which Strava will redirect the user after authorization. This should be a URL in your application where you handle the authorization callback.
--- response_type: The type of response expected. For OAuth 2.0 authorization code grant flow, this should be set to code.
--- scope: The scope of access requested by your application. This determines the level of access to the user's Strava data. For example, you might request access to read activities, read profile information, etc.

Example:

```js
const clientId = "YOUR_CLIENT_ID";
const redirectUri = "YOUR_REDIRECT_URI";
const responseType = "code";
const scope = "read_all";

const authorizationUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

// Redirect users to the authorization URL
window.location.href = authorizationUrl;
```

## Step 3

- Handle Authorization Callback:
  After users authorize our application, Strava will redirect them back to the redirect URI specified in the authorization URL. You need to handle this redirect in your application and extract the authorization code from the query parameters.
