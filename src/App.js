import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import PokemonContainer from "./containers/PokemonContainer";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

const Wrapper = ({ children }) => (
  <Box backgroundColor="gray.50" pb="10">
    {children}
  </Box>
);

const App = () => (
  <ChakraProvider>
    <Wrapper>
      <ScrollToTopButton />
      <PokemonContainer />
      <Footer />
    </Wrapper>
  </ChakraProvider>
);

export default App;
