import * as React from "react";
import {
  Spinner,
  Box,
  Tag,
  Badge,
  Text,
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  SimpleGrid,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import formatId from "../utils/formatId";

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

const SHINY_SPRITE = "front_shiny";

const PokemonModal = ({
  isOpen,
  onClose,
  generalData,
  color,
  description,
  sprite,
  toggleSprite,
}) => {
  return (
    <Modal
      scrollBehavior="inside"
      isCentered
      closeOnOverlayClick
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={`${color}.50`}>
        <ModalCloseButton />
        <ModalHeader>
          <Text casing="capitalize" d="flex" alignItems="center">
            {generalData.name}{" "}
            {generalData.types.map((details, i) => (
              <div key={i}>
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme={TYPE[details.type.name]}
                  ml="2"
                >
                  {details.type.name}
                </Badge>
              </div>
            ))}
          </Text>
        </ModalHeader>
        <ModalBody>
          <Box
            backgroundColor={`${color}.200`}
            borderRadius="lg"
            d="flex"
            alignItems="center"
            justifyContent="center"
            borderWidth="1px"
            borderColor={`${color}.200`}
            position="relative"
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
          <Text mt="5" mb="2" fontWeight="bold">
            Description
          </Text>
          <Text>{description}</Text>

          <Text mt="5" mb="2" fontWeight="bold">
            Abilities
          </Text>
          <SimpleGrid columns={3} spacing={2}>
            {generalData.abilities.map((ability, i) => (
              <Text key={i} casing="capitalize">
                {ability.ability.name.replace(/-/g, " ")}
              </Text>
            ))}
          </SimpleGrid>

          <Box mb="5">
            <Text mt="5" mb="2" fontWeight="bold">
              Moves
            </Text>
            <SimpleGrid columns={3} spacing={2}>
              {generalData.moves.map((move, i) => (
                <Text key={i} casing="capitalize">
                  {move.move.name.replace(/-/g, " ")}
                </Text>
              ))}
            </SimpleGrid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonModal;
