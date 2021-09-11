import Head from 'next/head';
import React from 'react';
import Body from '../components/Body/Body';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';


function Homepage(): JSX.Element {


  return (
    <>
      <Head>
        <title>Mosaic Example</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
     
      <Header/>
      <Body/>
      <Footer/>
    </>
  );
}

export default Homepage;
