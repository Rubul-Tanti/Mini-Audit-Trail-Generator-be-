const cors = require("cors");

const corsConfig = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://taskapp-fr.vercel.app/"
      ];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // allowed
      } else {
        callback(new Error("Not Allowed By CORS")); // blocked
      }
    },
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  });
};

module.exports = corsConfig;
