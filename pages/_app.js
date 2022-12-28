import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.css'
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
  </>
}
