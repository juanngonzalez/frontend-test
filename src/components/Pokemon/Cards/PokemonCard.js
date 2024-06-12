import { getTypeColor } from "@/styles/utils";
import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function PokemonCard({ pokemon }) {
  const deviceSize = useBreakpointValue({ base: 'small', sm: 'small', md: 'medium', lg: 'large', xl: 'extra-large' });

  return (
    <Stack
      spacing="5"
      boxShadow="xl"
      p="5"
      w={`${deviceSize === "small" ? 130 : 160}`}
      borderRadius="xl"
      backgroundImage="linear-gradient(to bottom, #ec2c3f00, white)"
      alignItems="center"
    >
        <Image
        alt="pokemon"
        w="150px"
        style={{ filter: "drop-shadow(5px 0px 10px rgba(0, 0, 0, 0.3))" }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
        />
      <Text textAlign="center" fontWeight="500" textTransform="Capitalize">
        {pokemon.name.replace('-',' ').toUpperCase()}
      </Text>
      <HStack>
        {pokemon.types.map((type) => (
          <Badge
            size="xs"
            key={type.slot}
            sx={{
              backgroundColor: getTypeColor(type.type.name).backgroundColor,
              border: `1px solid black`,
              marginRight: '5px' // Opcional: agregar un espacio entre los badges
            }}
          >
            {type.type.name}
          </Badge>
        ))}
      </HStack>
    </Stack>
  );
}
