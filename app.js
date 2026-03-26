const express = require('express');
const session = require('express-session');

const customer_routes = require('./router/auth_users').authenticated;
const genl_routes = require('./router/genera').general;

const app = express();

app.use(express.json());

// ✅ GLOBAL SESSION (IMPORTANT FIX)
app.use(session({
  secret: "fingerprint_customer",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}));

// ✅ AUTH MIDDLEWARE
app.use((req, res, next) => {
  if (req.url.startsWith("/customer/auth")) {
    if (req.session.authorization) {
      return next();
    } else {
      return res.status(401).json({ message: "User not logged in" });
    }
  }
  next();
});

const PORT = 5000;

// routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// start server
app.listen(PORT, () => console.log("Server running on port 5000"));