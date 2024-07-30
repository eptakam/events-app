/*
    nous desirons afficher 'pending' si l'enregistrement est en cours, 'success' si l'enregistrement a reussi, et 'error' si l'enregistrement a echoue.
    pour cela, nous avons besoin du hook useContext de 'react' pour acceder au contexte de notification en lui passant le composant NotificationContext.
*/

import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  // implementer un loading fallback text pour les commentaires
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  // consommer le contexte des notifications
  const notificationCtx = useContext(NotificationContext);

  // charger les commentaires en cas de requette GET
  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments); // comments: est la cle de l'objet JSON retourne par l'API (voir pages/api/comments/[eventId].js)
          setIsFetchingComments(false);
        })
        .catch((error) => console.log(error));
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // afficher une notification
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is being sent.',
      status: 'pending',
    })

    // send data to API
    // Attention: fetch n'a pas une promesse pour les erreurs. d'ou il n'entrera jamais dans le bloc catch meme s'il y a une erreur. c'est pour cela que nous utilisons tres souvent le status 500 et autre pour afficher les erreurs. Ici nous allons le forcer a entrer dans le bloc catch en utilisant un if pour verifier si la reponse est ok ou non.
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comment was saved!',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Your comment could not be saved!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments}/>}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
