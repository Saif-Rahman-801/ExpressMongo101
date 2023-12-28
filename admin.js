import express from "express";

const newRouter = express.Router();

const myMiddleWare = (req, res, next) => {
  console.log("from middleware");
  next();
};

// newRouter.use(myMiddleWare);
newRouter.all("*", myMiddleWare);

newRouter.get("/", (req, res) => {
  res.send("New admin");
});

newRouter.param("user", (req, res, next, id) =>{
    console.log(id);
    next()
})

newRouter.get("/:user", (req, res) => {
  res.send("New admin");
});

export default newRouter;
