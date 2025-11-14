const express = require("express");
const axios = require("axios");
const cors = require("cors");
const PORT = process.env.PORT || 8888;
const HOST = "127.0.0.1";
require("dotenv").config();

const app = express();
app.use(cors());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

// Endpoint to exchange code for access token
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      data: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }).toString(),
    });

    //new approach to redirect to front end

    const { access_token, expires_in } = response.data;

    // Redirect browser to frontend with token in URL hash
    const frontendUrl = "http://localhost:3000/";
    const redirectUrl = `${frontendUrl}#access_token=${access_token}&expires_in=${expires_in}`;
    res.redirect(redirectUrl);

    //responses the whole data
    // res.json(response.data);
    // const { access_token, refresh_token, expires_in } = response.data;

    // Send tokens to frontend (or just redirect to frontend)
    // res.json({ access_token, refresh_token, expires_in });
  } catch (err) {
    console.error(err.response.data);
    res.send("Error getting tokens");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: http://${HOST}:${process.env.PORT}`);
});
