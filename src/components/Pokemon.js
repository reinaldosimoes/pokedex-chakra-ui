import * as React from "react";
import {
  Spinner,
  Fade,
  Box,
  Tag,
  Badge,
  Heading,
  Text,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export const TYPE = {
  normal: "gray",
  ground: "orange",
  psychic: "pink",
  fairy: "pink",
  water: "blue",
  rock: "orange",
  poison: "purple",
  bug: "green",
  fighting: "red",
  grass: "green",
  ice: "cyan",
  electric: "yellow",
  ghost: "purple",
  dragon: "blue",
  dark: "blackAlpha",
  fire: "red",
  flying: "teal",
};

const REGULAR_SPRITE = "front_default";
const SHINY_SPRITE = "front_shiny";

const Pokemon = ({ id, url }) => {
  const [generalData, setGeneralData] = React.useState();
  const [speciesData, setSpeciesData] = React.useState();
  const [sprite, setSprite] = React.useState(REGULAR_SPRITE);
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGeneralData(data);
      });
  }, [url]);

  React.useEffect(() => {
    if (generalData && !speciesData) {
      fetch(generalData.species.url)
        .then((response) => response.json())
        .then((data) => {
          setSpeciesData(data);
        });
    }
  }, [generalData, speciesData]);

  React.useEffect(() => {
    if (generalData && speciesData) {
      const description = getEnglishDescription(
        speciesData.flavor_text_entries
      );

      setDescription(description);
    }
  }, [generalData, speciesData]);

  if (!generalData || !speciesData) {
    return <div />;
  }

  const toggleSprite = () => {
    if (sprite === REGULAR_SPRITE) {
      setSprite(SHINY_SPRITE);
    }

    if (sprite === SHINY_SPRITE) {
      setSprite(REGULAR_SPRITE);
    }
  };

  const getEnglishDescription = (entriesArray) => {
    if (!entriesArray) {
      return "";
    }

    const englishEntries = entriesArray.filter(
      (entry) => entry.language.name === "en"
    );

    const randomIndex = Math.floor(Math.random() * (englishEntries.length - 0));

    return englishEntries[randomIndex].flavor_text;
  };

  const getSupportedColor = (colorName) => {
    switch (colorName) {
      case "brown":
        return "orange";
      case "black":
      case "white":
        return "gray";
      default:
        return colorName;
    }
  };

  const color = getSupportedColor(speciesData.color.name);

  return (
    <Fade in>
      <Box
        id={id}
        backgroundColor={`${color}.50`}
        borderWidth="2px"
        borderRadius="lg"
        borderColor="gray.100"
        py="5"
        px="5"
      >
        <Box d="flex" justifyContent="space-between">
          <Tag
            fontWeight="bold"
            fontSize="sm"
            variant="subtle"
            colorScheme={color}
            mr="2"
            mb="2"
          >
            #{generalData.id}
          </Tag>

          <IconButton
            colorScheme="yellow"
            isActive={sprite === SHINY_SPRITE}
            size="xs"
            icon={<StarIcon />}
            onClick={toggleSprite}
          />
        </Box>

        <Box
          backgroundColor={`${color}.200`}
          borderRadius="lg"
          d="flex"
          alignItems="center"
          justifyContent="center"
          borderWidth="2px"
          borderColor={`${color}.200`}
        >
          <Image
            src={generalData.sprites[sprite]}
            alt={`${generalData.name}-sprite`}
            height="140px"
            fallback={
              <Box
                height="140px"
                d="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Spinner color={`${color}.300`} />
              </Box>
            }
          />
        </Box>

        <Box mt="3" d="flex" alignItems="center" justifyContent="center">
          <Heading size="md">
            <Text casing="capitalize">{generalData.name}</Text>
          </Heading>
        </Box>

        <Box mt="3" d="flex" alignItems="center" justifyContent="center">
          {generalData.types.map((details, i) => (
            <div key={i}>
              <Badge
                borderRadius="full"
                px="2"
                variant="outline"
                colorScheme={TYPE[details.type.name]}
                ml={details.slot === 2 && "2"}
              >
                {details.type.name}
              </Badge>
            </div>
          ))}
        </Box>

        {speciesData && (
          <Text as="q" fontSize="sm" noOfLines={[10, 2]} mt="4">
            {description}
          </Text>
        )}
      </Box>
    </Fade>
  );
};

export default Pokemon;
