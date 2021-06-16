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
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import PokemonModal from "./PokemonModal";
import formatId from "../utils/formatId";
import getEnglishDescription from "../utils/getEnglishDescription";
import getSupportedColor from "../utils/getSupportedColor";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const toggleSprite = () =>
    setSprite(sprite === REGULAR_SPRITE ? SHINY_SPRITE : REGULAR_SPRITE);

  const color = getSupportedColor(speciesData.color.name);

  return (
    <Fade in>
      <PokemonModal
        isOpen={isOpen}
        onClose={onClose}
        generalData={generalData}
        color={color}
        description={description}
        sprite={sprite}
        toggleSprite={toggleSprite}
      />

      <Box
        id={id}
        backgroundColor={`${color}.50`}
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.100"
        py="5"
        px="5"
      >
        <Box
          backgroundColor={`${color}.200`}
          borderRadius="lg"
          position="relative"
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
          <IconButton
            colorScheme="yellow"
            isActive={sprite === SHINY_SPRITE}
            size="xs"
            icon={<StarIcon />}
            onClick={toggleSprite}
            position="absolute"
            right="10px"
            top="0"
            mt="2"
          />
          <Tag
            fontWeight="bold"
            colorScheme={color}
            mr="2"
            mb="2"
            position="absolute"
            left="10px"
            bottom="0"
          >
            {formatId(generalData.id)}
          </Tag>
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
                variant="outline"
                px="2"
                colorScheme={TYPE[details.type.name]}
                ml={details.slot === 2 && "2"}
              >
                {details.type.name}
              </Badge>
            </div>
          ))}
        </Box>

        {speciesData && (
          <>
            <Text fontSize="sm" noOfLines={2} mt="4">
              {description}
            </Text>

            <Button
              mt="2"
              size="sm"
              isFullWidth
              colorScheme={color}
              onClick={onOpen}
            >
              More details
            </Button>
          </>
        )}
      </Box>
    </Fade>
  );
};

export default Pokemon;
