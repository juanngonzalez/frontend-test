import {
    Stack,
    Progress,
    Text,
    Button,
    Collapse,
} from "@chakra-ui/react";
import { useState } from "react";

export default function PokemonStats({ pokemon }) {
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [isAbilitiesOpen, setIsAbilitiesOpen] = useState(false);

    return (
        <Stack spacing="1" p={2} bg="yellow.100" borderRadius="xl">
            <Stack mb={1}>
                <Button onClick={() => setIsStatsOpen(!isStatsOpen)} bg="#FAFF0B2a" _hover={{ backgroundColor: "#FAFF0B5a" }}>
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
                <Button onClick={() => setIsAbilitiesOpen(!isAbilitiesOpen)} bg="#FAFF0B2a" _hover={{ backgroundColor: "#FAFF0B5a" }}>
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
    )
}