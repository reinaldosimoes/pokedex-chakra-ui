import * as React from "react";
import {
  Container,
  Box,
  Image,
  Spinner,
  Select,
  Text,
  Button,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import Pokemon from "../components/Pokemon";

const POKEDEX = {
  kanto: {
    limit: 151,
    offset: 0,
  },
  johto: {
    limit: 100,
    offset: 151,
  },
  hoenn: {
    limit: 135,
    offset: 251,
  },
  sinnoh: {
    limit: 107,
    offset: 386,
  },
  unova: {
    limit: 155,
    offset: 494,
  },
  kalos: {
    limit: 69,
    offset: 649,
  },
};

const PokemonContainer = () => {
  const [region, setRegion] = React.useState(Object.keys(POKEDEX)[0]);
  const [data, setData] = React.useState();

  React.useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${POKEDEX[region].limit}&offset=${POKEDEX[region].offset}`
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [region]);

  const setSelectedRegion = (e) => setRegion(e.target.value);

  if (!data) {
    return <div />;
  }

  return (
    <Container maxW="6xl" centerContent>
      <Box
        backgroundColor="red.400"
        width="100vw"
        textAlign="center"
        py="10"
        d="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Image
          width="100px"
          height="95px"
          src="/pokedex.png"
          fallback={
            <Box
              height="95px"
              d="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner color="white" />
            </Box>
          }
        />
        <Text mt="5" mb="2" fontSize="sm" fontWeight="bold" color="white">
          Select a Region
        </Text>

        <Select
          mb="5"
          width="xs"
          bg="gray.100"
          borderColor="gray.100"
          color="black"
          defaultValue={Object.keys(POKEDEX)[0]}
          onChange={(e) => setSelectedRegion(e)}
        >
          {Object.keys(POKEDEX).map((region, i) => (
            <option value={region} key={i}>
              {region.replace(/^./, (str) => str.toUpperCase())}
            </option>
          ))}
        </Select>
      </Box>

      <Box
        my="5"
        width="100%"
        textAlign="left"
        d="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text>
          There are <b>{POKEDEX[region].limit}</b> entries.
        </Text>

        <Button
          variant="outline"
          onClick={() =>
            window.open("https://github.com/reinaldosimoes/pokedex-chakra-ui")
          }
        >
          <Image width="20px" src="/github.svg" />{" "}
          <Text ml="2">View source</Text>
        </Button>
      </Box>

      <SimpleGrid columns={[1, 2, null, 3, 4, 5]} spacing={10}>
        {data.results.map((pokemon) => (
          <GridItem key={pokemon.name}>
            <Pokemon id={pokemon.name} url={pokemon.url} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default PokemonContainer;
