import * as React from "react";
import {
  Container,
  Box,
  Image,
  Select,
  Text,
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

  const numberEntries = Math.abs(
    POKEDEX[region].offset - POKEDEX[region].limit
  );

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
        <Image width="100px" src="/pokedex.png" />

        <Text mt="5" mb="2" fontSize="sm" fontWeight="bold" color="white">
          Select a Region
        </Text>

        <Select
          mb="5"
          variant="filled"
          width="xs"
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

      <Box my="5" width="100%" textAlign="left">
        <Text>
          There are <b>{numberEntries}</b> entries.
        </Text>
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
