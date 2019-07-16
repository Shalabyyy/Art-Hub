const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());

const users = require("./routes/api/users");
const products = require("./routes/api/products");
const orders = require("./routes/api/orders");
const admin = require("./routes/api/admin");
const media = require("./routes/api/uploads");

mongoose.connect(
  "mongodb+srv://youshalaby:Youssef98%2E@arthub-xqxau.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useCreateIndex: true
  },
);
mongoose.connection
  .once("open", function() {
    console.log("Conection has been made!");
  })
  .on("error", function(error) {
    console.log("Error is: ", error);
  });

app.get("/", (req, res) => res.json({ msg: "Hello World" }));

app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/orders", orders);
app.use("/api/admin", admin);
app.use("/api/uploads", media);

app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 4000, () => console.log(`Example app listening on port 4000!`));
