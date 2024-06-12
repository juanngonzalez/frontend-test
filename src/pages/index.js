import { useCallback, useEffect, useState } from "react";
import {
  Container,
  Stack,
  SimpleGrid,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  CircularProgress,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import { useCatchedPokemon } from "@/context/CatchedPokemonContext";
import { toast } from "react-toastify";
import PokemonCard from "@/components/Pokemon/Cards/PokemonCard";
import PokemonData from "@/components/Pokemon/DetailCards/PokemonData";
import axios from "axios";
import PokemonCardContainer from "@/components/Pokemon/Cards/PokemonCardContainer";

export default function Home({ initialPokemonData }) {
  const pokemonDataModal = useDisclosure();
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [initialPokemonValue, setInitialPokemonValue] = useState(initialPokemonData)
  const { searchedPokemon } = useCatchedPokemon();
  const deviceSize = useBreakpointValue({ base: 'small', sm: 'small', md: 'medium', lg: 'large', xl: 'extra-large' });

  async function fetchPokemonDetails(url) {
    const response = await axios.get(url);
    return response.data;
  }

  const handleViewPokemon = useCallback((pokemon) => {
    setSelectedPokemon(pokemon);
    pokemonDataModal.onOpen();
  }, [setSelectedPokemon, pokemonDataModal]);

  useEffect(() => {
    if (searchedPokemon) {
      handleViewPokemon(searchedPokemon)
    }
  }, [searchedPokemon, handleViewPokemon])

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const promises = initialPokemonValue.map((p) => fetchPokemonDetails(p.url));
        const pokemonDetails = await Promise.all(promises);
        setPokemon(pokemonDetails);
      } catch (error) {
        toast.error("Error fetching Pokémon details");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [currentPage, initialPokemonValue]);


  async function handleNextPage() {
    if (currentPage < 50) {
      const nextPage = currentPage + 1;
      await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${nextPage * 20}`
      ).then(res => {
        const newData = res.data.results;
        setInitialPokemonValue(newData);
        setCurrentPage(nextPage);
        if (deviceSize === "small") window.scrollTo(0, 0);
      });

    }
  }

  async function handlePrevPage() {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${prevPage * 20}`
      );
      const newData = response.data.results;
      setInitialPokemonValue(newData);
      setCurrentPage(prevPage);
      if (deviceSize === "small") window.scrollTo(0, 0);

    }
  }


  return (
    <>
      <Flex alignItems="center" minH="100vh" minW="100vw" justifyContent="center" >
        <Container maxW="100%" >
          <Stack >
            {!isLoading ?
              <>
                <PokemonCardContainer pokemon={pokemon} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} handleViewPokemon={handleViewPokemon} baseCol={2} sm={2} />
                {
                  deviceSize === "small" &&
                  <Flex flexDirection="row" justifyContent="space-evenly" w="100%" mt={5} mb={5}>
                    <Image src="/arrow-left.svg" alt="left arrow" style={{ height: 60, cursor: "pointer" }} onClick={handlePrevPage} />
                    <Image src="/arrow-right.svg" alt="right arrow" style={{ height: 60, cursor: "pointer" }} onClick={handleNextPage} />
                  </Flex>
                }
              </> :
              <Flex alignItems="center" minH="100vh" minW="100vw" justifyContent="center">
                <CircularProgress isIndeterminate color="green.300" />
              </Flex>
            }
          </Stack>
        </Container>
      </Flex>
      <Modal {...pokemonDataModal}   >
        <ModalOverlay />
        <ModalContent ml={5} mr={5} borderRadius={20} backgroundImage={`linear-gradient(to top, #f4f75c,white)`}>
          <ModalHeader textTransform="capitalize" backgroundColor="red" color="white" borderRadius="20px 20px 0px 0px">
            {selectedPokemon?.name}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            {selectedPokemon && <PokemonData pokemon={selectedPokemon} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0"
    );
    const initialPokemonData = response.data.results;
    return {
      props: { initialPokemonData },
    };
  } catch (error) {
    return {
      props: { initialPokemonData: [] },
    };
  }
}
