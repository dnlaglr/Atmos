import express from 'express'
import cors from 'cors'
import simpleGit from 'simple-git'

import { generateDeployID } from '../helper'

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.post("/deploy", async (req, res) => {
  const repoURL = req.body.repoURL;
  const deployID = generateDeployID(repoURL);

  await simpleGit().clone(repoURL, `repos/${deployID}`);

  res.json({
    deployID: deployID
  });
});

app.listen(5171, () => {
  console.log("Server listening at http://localhost:5171");
});