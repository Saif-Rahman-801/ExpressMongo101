import express, { Router } from "express";
import cookieParser from "cookie-parser";
import handler from "./handler.js";
const app = express();
const admin = express();
const PORT = 5000;

app.use(express.json()); // for Content-Type: "application/json()";
app.use(cookieParser());
app.set("view engine", "ejs");

/* app.use(
  static(__dirname + "/public/", {
    index: "home.html",
  })
); */ // to use satatic data from your project file (you can access images, text file or any kind of static data), you can give a option object, that will be a root folder that will be shown if no route is added.

const router = Router(); // it returns a router object
app.use(router); // your express app can use it

// now you can use router.get/post/delete etc instead of app.get/post/delete

// Exploring express app object
app.get("/ejs", (req, res) => {
  res.render("index");
});

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

app
  .route("/about/mission")
  .get((req, res) => {
    res.send("Mission get");
  })
  .post((req, res) => {
    res.send("Mission post");
  })
  .put((req, res) => {
    res.send("Mission put");
  });

// Exploring req object
app.get("/baseUrl", (req, res) => {
  console.log(req.baseUrl);
  console.log(req.originalUrl);
  res.send("url");
});

app.get("/baseUrl/:id", (req, res) => {
  console.log(req.query);
  res.send(req.query.filter);
});

app.post("/reqBody", (req, res) => {
  console.log(req.body);
  res.send("Request body");
});

app.get("/cookies", (req, res) => {
  console.log(req.cookies);
  res.send("Cookies");
});

app.get("/local", (req, res) => {
  res.format({
    "text/plain": () => {
      res.send("hello");
    },
    "text/html": () => {
      res.render("index", {
        name: "Saif Rahman",
      });
    },
    "application/json": () => {
      res.json({
        message: "hi",
      });
    },
    default: () => {
      res.status(406).send("Not acceptable");
    },
  });

  // res.render("index", {
  //   name: "Saif Rahman"
  // })
  /*  res.json({
    name: "Ban"
  }) */
  // res.sendStatus(200)
});

app.get("/cookie", (req, res) => {
  res.cookie("name", "something")
  res.end()
})

app.get("/location", (req, res) => {
  res.location("/test")
  res.end()
})

app.get("/obj", (req, res) => {
  res["send"]("This is obj type") 
})

app.get("/reqapp", handler);

app.listen(PORT, () => {
  console.log("app listening on ", PORT);
});
