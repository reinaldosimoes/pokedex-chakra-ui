import * as React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => (
  <Box as="footer" d="flex" justifyContent="center" textAlign="center">
    <Text fontSize="sm" mt="10" px="5">
      This application was built using <b>React</b>, <b>Chakra UI</b> and{" "}
      <b>PokeAPI</b>.
    </Text>
  </Box>
);

export default Footer;
