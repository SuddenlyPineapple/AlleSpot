const CLIENT_ID = "270fa00fa8144b2586c366cf69692f13";
const SCOPES = encodeURIComponent("user-library-read");
const REDIRECT_URI = process.env.NODE_ENV === "production" ? encodeURIComponent("https://suddenlypineapple.github.io/AlleSpot/") : encodeURIComponent("http://localhost:8080/");
const URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}`;

export default URL;