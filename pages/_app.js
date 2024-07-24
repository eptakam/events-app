/*
  _app.js est un fichier spécial qui est exécuté avant le rendu de chaque page. il est utilisé pour envelopper l'application avec des composants et des fonctionnalités qui doivent être partagés entre les pages.c'est mon AppShell.

  il permet de maintenir une cohérence dans l'application et d'optimiser l'expérience utilisateur en chargeant la structure de base de l'UI une seule fois, puis en mettant à jour le contenu spécifique à chaque page (Component {...pageProps}) sans recharger l'ensemble de l'application.

   _app.js peut etre considere comme le composant racine à l'intérieur de la section body du document html
*/

import Head from "next/head";

import "../styles/globals.css";

import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;