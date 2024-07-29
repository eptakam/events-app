import { connectDatabase, insertDocument, getAllDocuments } from "../../../helpers/db-util";

export default async function handlerComment(req, res) {
  // extrait l'id de l'evenement
  const eventId = req.query.eventId;
  let client;

  // se connecter a la base de donnnees
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  // verifier le type de methode HTTP
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      //  fermer la connexion
      client.close();
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    // inserer les commentaires dans la base de donnees MongoDb
    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      // ajouter l'id du commentaire cote client
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Commentaire enregistre!", text: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
  }

  if (req.method === "GET") {
    // se connecter a la base de donnees et recuperer les commentaires
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
      return;
    }
  }

  //  fermer la connexion
  client.close();
}
