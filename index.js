import express from "express";
import cors from "cors";
import "./models/User.js";
import "./models/Survey.js";
import "./services/passport.js";
import passport from "passport";
import cookieSession from "cookie-session";
import keys from "./config/keys.js";
import mongoose from "mongoose";
import auth from "./routes/authRoutes.js";
import survey from "./routes/surveyRoutes.js";
import bodyParser from "body-parser";

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());
await mongoose.connect(keys.mongoURI);

if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*',(req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ));
  });
}

app.use("/auth", auth);
app.use("/survey", survey);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
