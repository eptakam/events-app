export default function handlerComment(req, res) {
  // verifier le type de methode HTTP
  if (req.method === "POST") {
    const userEmail = req.body.email;
    const userName =req.body.name;
    const userComment = req.body.comment;

    const newUserComment = {
      id: new Date().toISOString(),
      email: userEmail,
      name: userName,
      comment: userComment
    };
     console.log(newUserComment);
     res.status(201).json({ message: "Commentaire enregistre!", comment: newUserComment });
    }
  }