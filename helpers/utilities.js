import fs from 'fs';
import path from 'path';


export function buildRegistrationPath() {
  // determiner le chemin du fichier (construire le chemin) dans lequel nous allons sauvegarder les donnees. pour cela, on utilise la methode .join() du module path de Node.js
  // process.cwd() retourne le repertoire de travail actuel du processus Node.js
  return path.join(process.cwd(), "data", "registration.json");
}

export function extractEmails(filePath) {
  // lire le contenu du fichier registration.json (si le fichier n'existe pas, il sera cree): fichier qui contiendra les emails des utilisateurs
  const fileData = fs.readFileSync(filePath);
  console.log("fileData: ", fileData);

  // convertir le contenu du fichier en objet JSON
  const data = JSON.parse(fileData);
  return data;
}