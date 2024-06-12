import {
    Stack,
    Text,
    Flex,
} from "@chakra-ui/react";

export default function PokemonInfo({ pokemon }) {
    return (
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
    )
}