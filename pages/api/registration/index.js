import { buildRegistrationPath, extractEmails } from "../../../helpers/utilities";
import fs from 'fs';

import { MongoClient } from "mongodb";

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

    // se connecter a la base de donnnees
    // const client = await MongoClient.connect(process.env.MONGODB_URI);
    const client = await MongoClient.connect('mongodb+srv://emmataks:PKQLmy7tTqNibJ4m@cluster0.n0prgxt.mongodb.net/registration?retryWrites=true&w=majority&appName=Cluster0');
      const db = client.db();
      await db.collection('emails').insertOne({ email: userEmail });

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