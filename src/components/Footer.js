import * as React from "react";
import { Box, Text, Link, Button, Image } from "@chakra-ui/react";

const Footer = () => (
  <footer>
    <Box d="flex" justifyContent="center" textAlign="center">
      <Text fontSize="sm" mt="10" px="5">
        This application was built using{" "}
        <Link href="https://reactjs.org/" isExternal>
          ReactJS
        </Link>
        ,{" "}
        <Link href="https://chakra-ui.com/" isExternal>
          Chakra UI
        </Link>{" "}
        and{" "}
        <Link href="https://pokeapi.co/" isExternal>
          PokéAPI
        </Link>
        .
      </Text>
    </Box>

    <Box d="flex" justifyContent="center" textAlign="center" mt="5">
      <Button
        variant="outline"
        onClick={() =>
          window.open("https://github.com/reinaldosimoes/pokedex-chakra-ui")
        }
      >
        <Image width="20px" src="/github.svg" /> <Text ml="2">View source</Text>
      </Button>
    </Box>
  </footer>
);

export default Footer;
