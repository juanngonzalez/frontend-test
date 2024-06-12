import {
    Box,
    Flex,
    Image,
    SimpleGrid,
    useBreakpointValue,
} from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";

export default function PokemonCardContainer({ pokemon, handleViewPokemon, handleNextPage, handlePrevPage, baseCol, sm }) {
    const deviceSize = useBreakpointValue({ base: 'small', sm: 'small', md: 'medium', lg: 'large', xl: 'extra-large' });

    return (
        <Flex alignItems="center" justifyContent="space-evenly" width="100%">
            {deviceSize != "small" && <Image src="/arrow-left.svg" alt="left arrow" style={{ height: 60, cursor: "pointer" }} onClick={handlePrevPage} />}
            <SimpleGrid spacing="5" columns={{ base: baseCol, md: 5, sm: sm }} mt={5}>
                {pokemon.map((pok) => (
                    <Box
                        as="button"
                        key={pok.id}
                        onClick={() => handleViewPokemon(pok)}
                    >
                        <PokemonCard pokemon={pok} />
                    </Box>
                ))}
            </SimpleGrid>
            {deviceSize != "small" && <Image src="/arrow-right.svg" alt="right arrow" style={{ height: 60, cursor: "pointer" }} onClick={handleNextPage} />}
        </Flex>
    );
}