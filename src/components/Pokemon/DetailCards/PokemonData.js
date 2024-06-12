import {
  Box,
  AspectRatio,
  Image,
  Stack,
  Text,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { getTypeColor } from "@/styles/utils";
import PokemonStats from "./PokemonStats";
import PokemonInfo from "./PokemonInfo";
import PokemonCatchedCheckbox from "./PokemonCatchedChecbox";

export default function PokemonData({ pokemon }) {
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
        <PokemonCatchedCheckbox pokemon={pokemon} />
        <AspectRatio w="full" ratio={1}>
          <Image
            alt="pokemon"
            style={{ filter: "drop-shadow(10px 0px 10px rgba(0, 0, 0, 0.4))" }}
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          />
        </AspectRatio>
        <PokemonInfo pokemon={pokemon} />
      </Stack>
      <PokemonStats pokemon={pokemon} />
    </Stack>
  );
}
