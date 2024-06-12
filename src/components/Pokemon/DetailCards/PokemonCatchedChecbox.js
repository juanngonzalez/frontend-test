import { useCatchedPokemon } from "@/context/CatchedPokemonContext";
import {
    Text,
    Flex,
    Button,
    Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function PokemonCatchedCheckbox({ pokemon }) {

    const [catched, setCatched] = useState(false);
    const { catchedPokemon, addPokemon, removePokemon } = useCatchedPokemon();

    useEffect(() => {
        setCatched(catchedPokemon.find(catched => catched.id == pokemon.id) ? true : false)
    }, [catchedPokemon, pokemon.id])

    const handleAddPokemon = (pokemonData) => {
        addPokemon(pokemonData);
    };

    const handleReleasePokemon = (pokemon) => {
        removePokemon(pokemon);
    };

    return (
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
    )
}