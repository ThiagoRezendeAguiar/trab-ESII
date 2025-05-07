import { Grid, Stack, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Searchbar from "./components/Searchbar";
import Filters from "./components/Filters";
import CardHome from "./components/CardHome";

import pizzaImg from "../../assets/images/margherita.png";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/Pizza";

import api from "../../services/api";

const Home = () => {
const [allPizzas, setAllPizzas] = useState<Product[]>([]);
const [filteredPizzas, setFilteredPizzas] = useState<Product[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [searchTerm, setSearchTerm] = useState<string>("");
const [activeFilter, setActiveFilter] = useState<string>("ALL");

useEffect(() => {
  const fetchPizzas = async () => {
    try {
      const response = await api.get("/pizza/");
      setAllPizzas(response.data);
      setFilteredPizzas(response.data);
    } catch (error) {
      console.error("Erro ao buscar pizzas:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPizzas();
}, []);

// Função para aplicar filtros de busca e categoria
const applyFilters = () => {
  // Primeiro filtra por termo de busca
  let result = allPizzas;
  
  if (searchTerm.trim()) {
    result = result.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Depois filtra por categoria
  if (activeFilter === "POPULAR") {
    result = result.filter((pizza) => 
      pizza.category?.toLowerCase() === "popular"
    );
  }
  
  setFilteredPizzas(result);
};

// Aplicar filtros quando mudar o termo de busca ou o filtro ativo
useEffect(() => {
  applyFilters();
}, [searchTerm, activeFilter, allPizzas]); // eslint-disable-line react-hooks/exhaustive-deps

const handleSearch = () => {
  applyFilters();
};

if (loading) {
  return (
    <div className="loading">
      <h2>Carregando produtos...</h2>
    </div>
  );
}

return (
  <Stack direction="column" minH="100vh" w="100%" bg="#F1F1F1">
    <Navbar isAuthenticated={true} />
    <Stack
      justifyContent="center"
      alignItems="center"
      py={30}
      gap="20px"
      px={{ base: "10px", md: "0" }}
    >
      <Searchbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearch={handleSearch} 
      />
      <Filters 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
        w="100%"
        maxW="container.xl"
      >
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((product) => (
            <CardHome
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              img={pizzaImg}
            />
          ))
        ) : (
          <Stack w="100%" textAlign="center" gridColumn="1/-1" py={10}>
            <Text>
              {activeFilter === "POPULAR" 
                ? "Nenhuma pizza popular encontrada" 
                : `Nenhuma pizza encontrada com "${searchTerm}"`}
            </Text>
          </Stack>
        )}
      </Grid>
    </Stack>
  </Stack>
);
};

export default Home;