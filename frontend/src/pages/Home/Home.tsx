import { Grid, Stack } from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import Searchbar from './components/Searchbar'
import Filters from './components/Filters'
import CardHome from './components/CardHome'

import margherita from '../../assets/images/margherita.png'

const Home = () => {
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
          <CardHome id="Margherita" name="Margherita" price={19.99} img={margherita}/>
          <CardHome id="Margherita" name="Margherita" price={19.99} img={margherita}/>
          <CardHome id="Margherita" name="Margherita" price={19.99} img={margherita}/>
          <CardHome id="Margherita" name="Margherita" price={19.99} img={margherita}/>
          <CardHome id="Margherita" name="Margherita" price={19.99} img={margherita}/>
          <CardHome id="Margherita" name="Margherita" price={19.99} img={margherita}/>
        </Grid>
        
      </Stack>
      
    </Stack>
  )
}

export default Home