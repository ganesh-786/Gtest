import { config } from "dotenv";
import express from "express";
config();
const PORT = process.env.PORT;
const app = express();
console.log(PORT);

app.use("/", (req, res) => {
  res.status(200).send(`Hello this is from website Proto`);
});
app.listen(PORT, () => {
  console.log(`app running at http://localhost:${PORT}`);
});
