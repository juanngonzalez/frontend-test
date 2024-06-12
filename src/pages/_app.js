import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css"
import { CatchedPokemonProvider } from '../context/CatchedPokemonContext';
import AppLayout from "@/components/AppLayout/AppLayout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CatchedPokemonProvider>
        <AppLayout>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            toastStyle={{
              backgroundImage: "linear-gradient(to left,white,#fcff52)",
            }}
           icon={<img src="/pokeball.svg" />} 
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover />
        </AppLayout>
      </CatchedPokemonProvider>
    </ChakraProvider>
  );
}
