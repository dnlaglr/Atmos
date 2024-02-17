import express from 'express'
import cors from 'cors'
import simpleGit from 'simple-git'

import { deployDoesntExist, generateDeployID, isValidGitRepoURL } from '../helper'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/deploy", async (req, res) => {
  const repoURL = req.body.repoURL;

  if (repoURL) {
    const deployID = generateDeployID(repoURL);

    if (isValidGitRepoURL(repoURL) && deployID) {
      if (deployDoesntExist(deployID)) {
        await simpleGit().clone(repoURL, `repos/${deployID}`);
    
        res.json({
          deployID: deployID
        });
      } else {
        res.json({
          error: "Error: Deployment already exists."
        });
      }
    } else {
      res.json({
        error: "Error: Not a valid GitHub repo URL."
      });
    }
  } else {
    console.error("Missing repoURL")
  }
});

app.listen(5171, () => {
  console.log('Server listening at http://localhost:5171');
});