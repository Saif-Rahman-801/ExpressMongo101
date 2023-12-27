import express, { Router } from "express";
const app = express();
const admin = express();
const PORT = 5000;

app.use(express.json()); // for Content-Type: "application/json()";

/* app.use(
  static(__dirname + "/public/", {
    index: "home.html",
  })
); */ // to use satatic data from your project file (you can access images, text file or any kind of static data), you can give a option object, that will be a root folder that will be shown if no route is added.

const router = Router(); // it returns a router object
app.use(router); // your express app can use it

// now you can use router.get/post/delete etc instead of app.get/post/delete

app.param("id", (req, res, next, id) => {
  console.log(id);

  const userDetails = {
    userId: id,
    name: "Shakib Al Hasan",
  };
  req.userDetails = userDetails;
  next();
});

app.get("/user/:id", (req, res) => {
  const details = req.userDetails;
  console.log(details);
  res.send(details);
});

router.get("/router", (req, res) => {
  res.send("Hello from router");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

admin.get("/dashboard", (req, res) => {
  console.log(admin.mountpath);
  res.send("Welcome to Dashboard");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Post api");
});

app.listen(PORT, () => {
  console.log("app listening on ", PORT);
});
