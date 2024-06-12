import { getTypeColor } from "@/styles/utils";
import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  useBreakpointValue,
  CircularProgress,
} from "@chakra-ui/react";
import { useState } from "react";

export default function PokemonCard({ pokemon }) {
  const deviceSize = useBreakpointValue({
    base: "small",
    sm: "small",
    md: "medium",
    lg: "large",
    xl: "extra-large",
  });

  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Stack
      spacing="5"
      boxShadow="xl"
      p="5"
      minW={`${deviceSize === "small" ? 150 : 160}`}
      maxW={`${deviceSize === "small" ? 150 : 160}`}
      minH={`${deviceSize === "small" ? 250 : 260}`}
      maxH={`${deviceSize === "small" ? 250 : 260}`}
      borderRadius="xl"
      backgroundImage="linear-gradient(to bottom, #ec2c3f00, white)"
      alignItems="center"
    >
      {imageLoading && (
        <CircularProgress
          mt={80}
          isIndeterminate
          color="red.300"
          size="30px" // Tamaño del indicador de carga
        />
      )}
      <Image
        alt="pokemon"
        style={{
          filter: "drop-shadow(5px 0px 10px rgba(0, 0, 0, 0.3))",
          display: imageLoading ? "none" : "block",
        }}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
        onLoad={handleImageLoad}
      />
      <Text textAlign="center" fontWeight="500" textTransform="capitalize">
        {pokemon.name.replace("-", " ").toUpperCase()}
      </Text>
      <HStack>
        {pokemon.types.map((type) => (
          <Badge
            size="xs"
            key={type.slot}
            sx={{
              backgroundColor: getTypeColor(type.type.name).backgroundColor,
              border: `1px solid black`,
              marginRight: "5px", // Opcional: agregar un espacio entre los badges
            }}
          >
            {type.type.name}
          </Badge>
        ))}
      </HStack>
    </Stack>
  );
}


