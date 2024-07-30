/*
  _app.js est un fichier spécial qui est exécuté avant le rendu de chaque page. il est utilisé pour envelopper l'application avec des composants et des fonctionnalités qui doivent être partagés entre les pages.c'est mon AppShell.

  il permet de maintenir une cohérence dans l'application et d'optimiser l'expérience utilisateur en chargeant la structure de base de l'UI une seule fois, puis en mettant à jour le contenu spécifique à chaque page (Component {...pageProps}) sans recharger l'ensemble de l'application.

   _app.js peut etre considere comme le composant racine à l'intérieur de la section body du document html
*/

import Head from "next/head";

import "../styles/globals.css";

import Layout from "../components/layout/layout";
import Notification from "../components/ui/notification";
import { NotificaitonContextProvider } from "../store/notification-context";

function MyApp({ Component, pageProps }) {
  return (
    // envelopper l'application avec le contexte de notification
    // remarquons que nous desirons envelopper _app.js avec le contexte de notification pour que les notifications soient accessibles dans toute l'application. Pourtant ce n'est pas le cas actuellement. Pourquoi? car ce n'est pas MyApp qui est rendu en premier mais Layout. Pour que le contexte de notification soit accessible dans toute l'application, il faut envelopper Layout avec le contexte de notification. D'ou nous allons enlever le composant Notification de _app.js et le mettre dans Layout. De cette maniere, le contexte de notification sera accessible dans toute l'application.
    <NotificaitonContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificaitonContextProvider>
  );
}

export default MyApp;
