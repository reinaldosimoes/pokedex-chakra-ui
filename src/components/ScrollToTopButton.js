import * as React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <Box position="fixed" bottom="5" right="5" zIndex="popover">
      <IconButton onClick={scrollToTop} icon={<ArrowUpIcon />} />
    </Box>
  );
};

export default ScrollToTopButton;
