import * as React from "react";
import { Box, Fade, IconButton } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ScrollToTopButton = () => {
  const [isHidden, setIsHidden] = React.useState(window?.scrollY < 350);
  const debouncedIsHidden = useDebounce(isHidden, 500);

  const handleScroll = () => {
    if (window.scrollY <= 350) {
      return setIsHidden(true);
    }

    return setIsHidden(false);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <Box position="fixed" bottom="5" right="5" zIndex="docked">
      <Fade in={!debouncedIsHidden}>
        <IconButton
          colorScheme="gray"
          onClick={scrollToTop}
          icon={<ArrowUpIcon />}
        />
      </Fade>
    </Box>
  );
};

export default ScrollToTopButton;
