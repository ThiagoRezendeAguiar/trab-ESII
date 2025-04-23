import { Grid, Stack } from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import Searchbar from './components/Searchbar'
import Filters from './components/Filters'
import CardHome from './components/CardHome'

import margherita from '../../assets/images/margherita.png'
import { useEffect, useState } from 'react'
import { Product } from '../../interfaces/Product'

import api from '../../services/api'

const Home = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/pizza/"); 
        console.log(response.data)
        setProducts(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);

  if(loading){
    return(
        <div className="loading">
            <h2>Carregando prdutos...</h2>
        </div>
    )
}


  return (
    <Stack direction="column"  minH="100vh" w="100%" bg="#F1F1F1">
      <Navbar />
      <Stack justifyContent="center" alignItems="center" py={30} gap="20px" px={{base: "10px", md:"0"}}>
        <Searchbar />
        <Filters />
        {/* Map para adicionar os cards com os Items*/}
        <Grid 
          templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}} 
          gap={6} w="100%" maxW="container.xl" 
          
        >
          { products.map((product) => (
            <CardHome
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              img={margherita}
              >

            </CardHome>
          ))}
        </Grid>
        
      </Stack>
      
    </Stack>
  )
}

export default Home