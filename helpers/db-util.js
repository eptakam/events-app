/*
    MongoClient : Utilisé pour se connecter à MongoDB.
    client.db() : Accède à la base de données par défaut.
    db.collection(collection) : Accède à la collection spécifiée.
    find(filter) : Applique un filtre pour sélectionner les documents.
    sort(sort) : Trie les documents selon les critères spécifiés.
    toArray() : Convertit le curseur de résultats en un tableau de documents.
    await : Utilisé pour attendre la fin de l'opération asynchrone.
*/

import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // se connecter a la base de donnees
  const client = await MongoClient.connect(
    "mongodb+srv://emmataks:PKQLmy7tTqNibJ4m@cluster0.n0prgxt.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  // creer une instance de la base de donnees
  const db = client.db();

  // inserer des commentaires dans la base de donnees
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  // creer une instance de la base de donnees
  const db = client.db();

  // recuperer les commentaires specifiques dans la base de donnees
  const documents = await db
    .collection(collection) // acces a la collection
    .find(filter) // filtrer les commentaires
    .sort(sort) // trier les commentaires
    .toArray(); // convertir en un tableau de commentaires

  return documents;
}