import { useRef, useState } from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Flex,
  Text,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import PokemonCard from '../PokemonCard';
import axios from 'axios';
import { useCatchedPokemon } from '@/context/CatchedPokemonContext';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [input, setInput] = useState("");
  const { addSearchedPokemon, removeSearchedPokemon, catchedPokemon } = useCatchedPokemon();
  const [currentPage, setCurrentPage] = useState(0);
  const deviceSize = useBreakpointValue({ base: 'small', sm: 'small', md: 'medium', lg: 'large', xl: 'extra-large' });
  const pokemonsPerPage = deviceSize !== "small" ? 5 : 1;
  const totalPages = Math.ceil(catchedPokemon.length / pokemonsPerPage);
  const caughtPokemonCount = catchedPokemon.length;
  const pokemonDataModal = useDisclosure();

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const searchPokemon = async () => {
    if (input) {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
        addSearchedPokemon(res.data);
      } catch (error) {
        toast.error("Error fetching pokemon")
      }
    } else {
      emptySearchPokemon();
    }
  };

  const emptySearchPokemon = () => {
    removeSearchedPokemon();
    setInput("");
  };

  return (
    <>
      <Box
        as="nav"
        sx={{
          position: 'fixed',
          top: 0,
          width: '100%',
          backgroundColor: '#f4f75c',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: "space-between"
        }}
      >
        <Image src="/pokemon.svg" alt="Logo" style={{ height: '75px', paddingLeft: '10px', cursor: "pointer" }} onClick={emptySearchPokemon} />
        <InputGroup width="50%" marginTop="20px">
          <Input
            sx={{
              backgroundColor: "white",
            }}
            placeholder='Search a Pokémon'
            focusBorderColor='red.400'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <InputRightElement>
            <button onClick={searchPokemon} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <Image src='/search.svg' alt='search' style={{ width: 25 }} />
            </button>
          </InputRightElement>
        </InputGroup>
        <Flex position="relative">
          <Image src="/pokeball.svg" alt="Logo" style={{ height: '30px', margin: '25px 20px 0px 0px', cursor: 'pointer' }} onClick={() => pokemonDataModal.onOpen()} />
          {caughtPokemonCount > 0 && (
            <Box
              position="absolute"
              top="45px"
              right="15px"
              bg="red"
              borderRadius="50%"
              color="white"
              width="17px"
              height="18px"
              display="flex"
              fontSize={12}
              justifyContent="center"
              alignItems="center"
            >
              {caughtPokemonCount}
            </Box>
          )}
        </Flex>
      </Box>
      <Modal {...pokemonDataModal} size="full">
        <ModalOverlay />
        <ModalContent borderRadius={20} ml={50} mr={50} mt={10} minHeight={"90vh"} backgroundImage={`linear-gradient(to top, #f4f75c,white)`}  >
          <ModalHeader textTransform="capitalize" backgroundColor="red" color="white" borderRadius="20px 20px 0px 0px">
            Catched Pokemons ({catchedPokemon.length})
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody >
            <Flex alignItems="center" flexDirection={`${deviceSize === "small" ? "column" : "row"}`} justifyContent="space-evenly" height="70vh" overflowX="auto"  >
              {deviceSize !== "small" && <Image src="/arrow-left.svg" alt="left arrow" style={{ height: 60, cursor: "pointer" }} onClick={handlePrevPage} />}
              <SimpleGrid  spacing="5" columns={{ base: 1, md: 5, sm: 1 }}>
                {catchedPokemon
                  .slice(currentPage * pokemonsPerPage, (currentPage + 1) * pokemonsPerPage)
                  .map((pokemon) => (
                    <Box
                      key={pokemon.id}
                    >
                      <PokemonCard pokemon={pokemon} />
                    </Box>
                  ))}
              </SimpleGrid>
              {deviceSize !== "small" && <Image src="/arrow-right.svg" alt="right arrow" style={{ height: 60, cursor: "pointer" }} onClick={handleNextPage} />}
              {deviceSize === "small" &&
                <Flex flexDirection="row" justifyContent="space-evenly" w="100%">
                  <Image src="/arrow-left.svg" alt="left arrow" style={{ height: 60, cursor: "pointer" }} onClick={handlePrevPage} />
                  <Image src="/arrow-right.svg" alt="right arrow" style={{ height: 60, cursor: "pointer" }} onClick={handleNextPage} />
                </Flex>}
            </Flex>
            <Box textAlign="center">
              <Text fontSize={15} fontWeight={500}>
                {currentPage + 1} of {totalPages}
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
