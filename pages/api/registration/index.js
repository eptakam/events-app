import {
  buildRegistrationPath,
  extractEmails,
} from "../../../helpers/utilities";
import fs from "fs";
import { connectDatabase, insertDocument } from "../../../helpers/db-util";


export default async function handler(req, res) {
  // verifier le type de methode HTTP
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // valider l'email
    if (userEmail.trim() === "" || !userEmail.trim().includes("@")) {
      res.status(422).json({ message: "Email invalide!" });
      return;
    }

    const newUserEmail = {
      id: new Date().toISOString(),
      email: userEmail,
    };

    let client;

    // se connecter a la base de donnnees
    try {
      client = await connectDatabase();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: newUserEmail });
      //  fermer la connexion
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    // console.log(newUserEmail);

    // // sauvegarder l'email dans une base de donnees ou un fichier
    // // construire le chemin du fichier
    // const filePath = buildRegistrationPath();

    // // extraire les emails existants dans le fichier
    // const data = extractEmails(filePath);

    // // ajouter le nouvel email a la liste
    // data.push(newUserEmail);
    // console.log("data_api: ", data);

    // // ecrire la liste mise a jour dans le fichier
    // fs.writeFileSync(filePath, JSON.stringify(data));

    // repondre a la requete
    res.status(201).json({ message: "Email enregistre!", email: newUserEmail });
  }
}
