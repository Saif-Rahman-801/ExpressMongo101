const handler = (req, res) => {
  console.log(req.secure);
  res.send("reqApp");
};
export default handler;