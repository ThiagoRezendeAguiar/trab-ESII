import { Grid, Stack } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Searchbar from "./components/Searchbar";
import Filters from "./components/Filters";
import CardHome from "./components/CardHome";

import pizzaImg from "../../assets/images/margherita.png";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/Product";

import api from "../../services/api";

const Home = () => {
  const [pizza, setPizza] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await api.get("/pizza/");
        setPizza(response.data);
      } catch (error) {
        console.error("Erro ao buscar pizzas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando produtos...</h2>
      </div>
    );
  }

  return (
    <Stack direction="column" minH="100vh" w="100%" bg="#F1F1F1">
      <Navbar />
      <Stack
        justifyContent="center"
        alignItems="center"
        py={30}
        gap="20px"
        px={{ base: "10px", md: "0" }}
      >
        <Searchbar />
        <Filters />
        {/* Map para adicionar os cards com os Items*/}
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
          {pizza.map((product) => (
            <CardHome
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              img={pizzaImg}
            ></CardHome>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Home;
