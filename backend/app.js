const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8000;
const cors = require("cors");
const db = require("./config/db");
const path = require("path");

var adminrouts = require("./router/adminrouter");
var uploadExcelFileRouter = require("./router/index");

// app.use(cors()); (just for now)
// app.use(
//   cors({
//     origin: ["http://localhost:3000","http://89.116.32.160:3000"], //  Your frontend origin
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // allow cookies or auth headers if used
//   })
// );

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "5mb" }));
app.use(express.static(__dirname + "/public"));

app.use("/admin", adminrouts); 
app.use("/", uploadExcelFileRouter);

const seeder = require("./config/seedr");
seeder.adminseeder();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log("Server running at " + port);
});
