import { Button, Center, FormControl, FormLabel, Image, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'

import img from '../../assets/images/margherita.png' 
import { FaArrowLeft } from 'react-icons/fa6';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import ConfirmButton from '../../components/ConfirmButton';

const ProductDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [ammount, setAmmount] = useState<number>(1);

  const [value, setValue] = useState('');

  const handleSum = () => {
    if(ammount >= 50) {
      setAmmount(50);
    }
    else{
      setAmmount(ammount + 1);
    }
  }
  const handleSubtraction = () => {
    if(ammount === 1) {
      setAmmount(1);
    }
    else{
      setAmmount(ammount - 1);
    }
  }

  // Pegar produto pelo id para colocar sua imagem 
  return (
    <Stack >
       <Button 
        onClick={() => navigate('/')}
        p="30px"
        m={{base: "0", md: "10px"}}
        maxW="80px"
        _hover={{opacity: 0.8}}
        justifyContent="start"
        bg="none"
        >
          <FaArrowLeft size={20} />
      </Button>
      <Stack alignItems="center">
        <Image
            src={img}
            alt={id} // Id como nome do produto
            borderRadius='full'
            w="275px"
        />
        <Stack direction="row" gap={10}>
          <Button 
              onClick={handleSum} 
              bg="#DFDFDF"
              borderRadius="15px" 
              p="10px 15px"
              _hover={{opacity: 0.8}}
          >
              
              <FaPlus size={20} />
          </Button>
          <Center fontSize="25px" fontWeight="600">
            {ammount}
          </Center>
          <Button 
              onClick={handleSubtraction} 
              bg="#DFDFDF"
              borderRadius="15px" 
              p="10px 15px"
              _hover={{opacity: 0.8}}
          >
              
              <FaMinus size={20} />
          </Button>
        </Stack>

        <Stack gap={5} w="100%" maxW="200px" py="20px">
          <FormControl>
            <FormLabel fontWeight="700" color="secondary">Size:</FormLabel>
            <Center>
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction="column" spacing={3}>
                <Radio value="Small" colorScheme="blackAlpha" _checked={{
                    borderColor: "black",
                    bg: "white", 
                    _before: {
                      content: '""',
                      w: "75%",   
                      h: "75%",
                      borderRadius: "full",
                      bg: "black", 
                    }
                  }}>
                    Small
                  </Radio>
                  <Radio value="Medium" colorScheme="blackAlpha" _checked={{
                    borderColor: "black",
                    bg: "white", 
                    _before: {
                      content: '""',
                      w: "75%",   
                      h: "75%",
                      borderRadius: "full",
                      bg: "black", 
                    }
                  }}>
                    Medium
                  </Radio>
                  <Radio value="Large" colorScheme="blackAlpha" _checked={{
                    borderColor: "black",
                    bg: "white", 
                    _before: {
                      content: '""',
                      w: "75%",   
                      h: "75%",
                      borderRadius: "full",
                      bg: "black", 
                    }
                  }}>
                    Large
                  </Radio>
                </Stack>
              </RadioGroup>
            </Center>
          </FormControl>
        </Stack>
        
        <ConfirmButton text="Confirm" onClick={() => {}}>

        </ConfirmButton>

        
      </Stack>
      
    
    </Stack>
    
  )
}

export default ProductDetail