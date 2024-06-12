import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CatchedPokemonContext = createContext();

export const useCatchedPokemon = () => {
  return useContext(CatchedPokemonContext);
};

export const CatchedPokemonProvider = ({ children }) => {
  const [catchedPokemon, setCatchedPokemon] = useState([]);
  const [searchedPokemon, setSearchedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api');
        setCatchedPokemon(response.data);
      } catch (error) {
        toast.error('Error fetching catched Pokémon');
      }
    };
    fetchData();
  }, []);

  const addSearchedPokemon = (pokemon) => {
    setSearchedPokemon(pokemon);
  };

  const removeSearchedPokemon = () => {
    setSearchedPokemon(null);
  };

  const addPokemon = async (pokemon) => {
    try {
      await axios.post('/api', pokemon);
      setCatchedPokemon((prev) => [...prev, pokemon]);
      toast.success("Pokemon catched")

    } catch (error) {
      toast.error(error.message);
    }
  };

  const removePokemon = async (pokemon) => {
    try {
      setCatchedPokemon((prevState) => prevState.filter((pok) => pok.id !== pokemon.id));
      await axios.delete(`/api/${pokemon.id}`);
      toast.success("Pokemon released")
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <CatchedPokemonContext.Provider value={{ catchedPokemon, addPokemon, removePokemon, addSearchedPokemon, searchedPokemon, removeSearchedPokemon }}>
      {children}
    </CatchedPokemonContext.Provider>
  );
};
