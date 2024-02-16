import { createHash } from 'crypto'

export function generateDeployID(repoURL: string) : string {
  const hashedID = createHash('sha1').update(repoURL).digest('hex');

  return hashedID.slice(0, 6);
}