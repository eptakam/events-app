import { MongoClient } from "mongodb";

export default async function handlerComment(req, res) {
  // extrait l'id de l'evenement
  const eventId = req.query.eventId;

  // se connecter a la base de donnnees
  const client = await MongoClient.connect(
    "mongodb+srv://emmataks:PKQLmy7tTqNibJ4m@cluster0.n0prgxt.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
  );

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
    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    // ajouter l'id du commentaire cote client
    newComment.id = result.insertedId;

    res
      .status(201)
      .json({ message: "Commentaire enregistre!", text: newComment });
  }

  if (req.method === "GET") {
   // se connecter a la base de donnees
   const db = client.db();

    // recuperer les commentaires de la base de donnees
   const documents = await db.collection("comments").find().sort({_id: -1}).toArray();
   res.status(200).json({ comments: documents });

    res.status(200).json({ comments: dummyList });
  }

  //  fermer la connexion
  client.close();
}
