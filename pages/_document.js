/*
  _document.js permet de personnaliser entierement le document HTML de l'application. il est utilisé pour envelopper l'application avec des composants et des fonctionnalités qui doivent être partagés entre les pages. c'est mon DocumentShell. Aussi, il permet d'ajout du contenu extra à la page HTML (voir le cas de la div 'overlays' ci-dessous).

  pour ce faire nous devons y ajouter un composant special, 'class-based component'
*/

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <body>
          <div id="overlays"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
