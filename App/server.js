require("dotenv").config();
require("./db/connection");

const express = require("express")
const app = express();
const PORT = process.env.IS_PROD ? process.env.PORT : 3000;
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const horseRoutes = require("./routes/horseRoutes");
const userRoutes = require("./routes/userRoutes");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const helmet = require("helmet");
const moment = require("moment");
const cors = require("cors");
const flash = require("connect-flash");
const passDataToViews = require("./middleware/passDataToViews");
const path = require("path");

app.set("view engine", "ejs");


app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use (methodOverride("_method"));
app.use(express.static(path.join(__dirname, "publicCss")));
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
         mongoUrl: process.env.MONGODB_URI })
}));
app.use(flash());
app.use(passDataToViews);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "https://*.imgur.com", "https://i.imgur.com", "https://*.fbcdn.net", "https://*.facebook.com", "data:"],
        "script-src": ["'self'", "'unsafe-inline'"],
      },
    },
  })
);
app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
});

// Routes
app.get("/", (req, res) => {
    res.render("home", {
        user: req.session.userId || null
});
});

app.use("/horses", horseRoutes);
app.use("/users", userRoutes);
app.use("/users", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});