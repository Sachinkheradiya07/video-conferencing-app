let IS_PROD = true;
const server = IS_PROD
  ? "https://video-conferencing-app-v56u.onrender.com"
  : "http://localhost:8080";

export default server;
