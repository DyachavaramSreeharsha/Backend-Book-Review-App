const express = require('express');
const app = express();

const genl_routes = require('./router/genera');
const customer_routes = require('./router/auth_users');

app.use(express.json());

app.use("/", genl_routes);
app.use("/customer", customer_routes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});