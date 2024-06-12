import {
  Box,
  AspectRatio,
  Image,
  Stack,
  Progress,
  Text,
  Badge,
  HStack,
  Button,
  Flex,
  Collapse,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCatchedPokemon } from '../context/CatchedPokemonContext';
import { getTypeColor } from "@/styles/utils";

export default function PokemonData({ pokemon }) {
  const [catched, setCatched] = useState(false);
  const [isAbilitiesOpen, setIsAbilitiesOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const { catchedPokemon, addPokemon, removePokemon } = useCatchedPokemon();

  useEffect(() => {
    setCatched(catchedPokemon.find(catched => catched.id == pokemon.id) ? true : false)
  }, [catchedPokemon])

  const handleAddPokemon = (pokemonData) => {
    addPokemon(pokemonData);
  };

  const handleReleasePokemon = (pokemon) => {
    removePokemon(pokemon);
  };

  return (
    <Stack spacing="5" pb="5" ml={2} mr={2} >
      <Stack spacing="5" position="relative">
        <Box position="absolute" left="0" zIndex="99">
          <Stack>
            <Text fontSize="sm" fontWeight={500}>Types</Text>
            <HStack>
              {pokemon.types.map((e, i) => (
                <Badge sx={{
                  backgroundColor: getTypeColor(e.type.name).backgroundColor,
                  border: `1px solid black`,
                  marginRight: '5px' // Opcional: agregar un espacio entre los badges
                }} key={i}>{e.type.name}</Badge>
              ))}
            </HStack>
          </Stack>
        </Box>
        <Flex position="absolute" right="0" zIndex="99">
          <Text mt={2}>{catched ? "Catched" : "Not Catched"}</Text>
          <Button onClick={() => {
            if (catched) {
              handleReleasePokemon(pokemon);
              setCatched(false);
            } else {
              handleAddPokemon(pokemon);
              setCatched(true);
            }
          }}
            variant="unstyled"
            margin="0px -25px 0px 5px">
            {catched ?
              <Image src={"/pokeball.svg"} alt="Checkbox" boxSize="30px" sx={{ cursor: "pointer", marginLeft: 1 }} />
              :
              <Image src={"/pokeballNN.svg"} alt="Checkbox" boxSize="35px" sx={{ cursor: "pointer" }} />
            }
          </Button>
        </Flex>
        <AspectRatio w="full" ratio={1}>
          <>
            <Image
            style={{ filter: "drop-shadow(10px 0px 10px rgba(0, 0, 0, 0.4))" }}
              objectFit="contain"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            />
          </>
        </AspectRatio>
        <Stack direction="row" spacing="5" border="1px solid whitesmoke" borderRadius={20} padding={2} backgroundImage={`linear-gradient(to right,#FAFF0B5a,#FAFF0B2a)`}>
          <Flex justifyContent="space-around" alignItems="center" minW="100%">
            <Stack align="center">
              <Text fontSize="sm" fontWeight="bold" >Weight</Text>
              <Text>{pokemon.weight}</Text>
            </Stack>
            <Stack align="center">
              <Text fontSize="sm" fontWeight="bold">Height</Text>
              <Text>{pokemon.height}</Text>
            </Stack>
            <Stack align="center">
              <Text fontSize="sm" fontWeight="bold">Moves</Text>
              <Text>{pokemon.moves.length}</Text>
            </Stack>
          </Flex>
        </Stack>
      </Stack>
      <Stack spacing="1" p={2}  bg="yellow.100" borderRadius="xl">
        <Stack mb={1}>
          <Button onClick={() => setIsStatsOpen(!isStatsOpen)} bg="#FAFF0B2a" _hover={{backgroundColor:"#FAFF0B5a"}}>
            {isStatsOpen ? "Hide Stats" : "Show Stats"}
          </Button>
          <Collapse in={isStatsOpen} animateOpacity>
            {pokemon.stats.map((e, i) => (
              <Stack key={i}>
                <Text marginTop={2} fontSize="xs" fontWeight="bold">{e.stat.name.replace("-", " ").toUpperCase()}</Text>
                <Progress bg="gray.300" borderRadius="full" value={e.base_stat} />
              </Stack>
            ))}
          </Collapse>
        </Stack>
        <Stack >
          <Button onClick={() => setIsAbilitiesOpen(!isAbilitiesOpen)} bg="#FAFF0B2a" _hover={{backgroundColor:"#FAFF0B5a"}}>
            {isAbilitiesOpen ? "Hide Abilities" : "Show Abilities"}
          </Button>
          <Collapse in={isAbilitiesOpen} animateOpacity>
            {pokemon.abilities.map((ability, index) => (
              <Stack key={index}>
                <Text fontSize="xs" fontWeight="bold">{ability.ability.name.replace("-", " ").toUpperCase()}</Text>
                <Text>{ability.description}</Text>
              </Stack>
            ))}
          </Collapse>
        </Stack>
      </Stack>
    </Stack>
  );
}
