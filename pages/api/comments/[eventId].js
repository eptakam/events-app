export default function handlerComment(req, res) {
  // extrait l'id de l'evenement
  const eventId = req.query.eventId;

  // verifier le type de methode HTTP
  if (req.method === "POST") {
    const {email, name, text} = req.body;

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

    const newUserComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newUserComment);
    res
      .status(201)
      .json({ message: "Commentaire enregistre!", text: newUserComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Max", text: "A first comment!" },
      { id: "c2", name: "Manuel", text: "A second comment!" },
    ];

    res.status(200).json({ comments: dummyList });
  }
}
