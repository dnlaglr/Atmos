import { createHash } from 'crypto'
import fs from 'fs'
import path from 'path'

export function isValidGitRepoURL(repoURL: string) : boolean {
  const repoRegex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)(?:\/)?$/;

  return repoRegex.test(repoURL);
}

export function generateDeployID(repoURL: string) : string {
  const hashedID = createHash('sha1').update(repoURL).digest('hex');

  return hashedID.slice(0, 6);
}

export function deployDoesntExist(deployID: string) : boolean {
  return fs.existsSync(path.join(__dirname + `../../../repos/${deployID}`)) == false;
}