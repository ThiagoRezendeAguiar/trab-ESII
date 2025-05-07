import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useParams ,useNavigate} from "react-router-dom";
import img from "../../assets/images/margherita.png";

import { FaMinus, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import ConfirmButton from "../../components/ConfirmButton";
import BackButton from "../../components/BackButton";
import api from "../../services/api";
import { Product } from "../../interfaces/Pizza";
import { useCart } from '../../contexts/CartContext';
const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  
  const { addItem } = useCart();
  const [amount, setAmount] = useState<number>(1);
  const [pizza, setPizza] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [size, setSize] = useState<string>("medium");

  const handleSum = () => {
    if (amount >= 50) {
      setAmount(50);
    } else {
      setAmount(amount + 1);
    }
  };
  
  const handleSubtraction = () => {
    if (amount === 1) {
      setAmount(1);
    } else {
      setAmount(amount - 1);
    }
  };

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await api.get(`/pizza/${id}`);
        setPizza(response.data);
      } catch (error) {
        console.error("Erro ao buscar pizzas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando produtos...</h2>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!size) {
      toast({
        title: "Select a size",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    
    if (!pizza) return;
    
    let finalPrice = 0;
    switch (size) {
      case "Small":
        finalPrice = pizza.price * 0.8;
        break;
      case "Medium":
        finalPrice = pizza.price;
        break;
      case "Large":
        finalPrice = pizza.price * 1.2;
        break;
    }
  
    // Adicionar ao carrinho
    addItem({
      id: pizza.id,
      name: pizza.name,
      price: finalPrice,
      quantity: amount,
      size: size as 'Small' | 'Medium' | 'Large',
      image: img,
    });
    
    toast({
      title: "Product added to cart",
      description: `${amount}x ${pizza.name} (${size})`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    
 
  };

  return (
    <Stack mb="20px" gap="7">
      <Stack
        direction="row"
        alignItems="center"
        position="relative"
        width="100%"
        p="20px"
      >
        <BackButton url="/" />
        <Heading margin="0 auto">{pizza?.name}</Heading>
      </Stack>

      
      <form onSubmit={handleSubmit}>
        <Stack alignItems="center" gap="5">
          <Image
            src={img}
            alt={pizza?.name || id}
            borderRadius="full"
            w="275px"
          />
          <Stack direction="row" gap={10}>
            <Button
              onClick={handleSum}
              bg="#DFDFDF"
              borderRadius="15px"
              p="10px 15px"
              _hover={{ opacity: 0.8 }}
              type="button"
            >
              <FaPlus size={20} />
            </Button>
            <Center fontSize="25px" fontWeight="600">
              {amount}
            </Center>
            <Button
              onClick={handleSubtraction}
              bg="#DFDFDF"
              borderRadius="15px"
              p="10px 15px"
              _hover={{ opacity: 0.8 }}
              type="button"
            >
              <FaMinus size={20} />
            </Button>
          </Stack>

          <Stack gap={3} w="100%" maxW="200px" py="20px">
            <Text fontSize="16px" fontWeight="700" color="secondary">
              Ingredients:
            </Text>
            <Text
              textAlign="center"
              color="gray.500"
              textTransform="capitalize"
              fontWeight="500"
            >
              {pizza?.ingredients}
            </Text>
          </Stack>

          <Stack gap={5} w="100%" maxW="200px" pb="20px">
            {pizza && (
              <FormControl>
                <FormLabel fontWeight="700" color="secondary">
                  Size:
                </FormLabel>
                <Center>
                  <RadioGroup onChange={setSize} value={size}>
                    <Stack direction="column" spacing={3}>
                      <Radio value="Small" colorScheme="gray">
                        Small - ${(pizza.price * 0.8 * amount).toFixed(2)}
                      </Radio>
                      <Radio value="Medium" colorScheme="gray">
                        Medium - ${(pizza.price * 1.0 * amount).toFixed(2)}
                      </Radio>
                      <Radio value="Large" colorScheme="gray">
                        Large - ${(pizza.price * 1.2 * amount).toFixed(2)}
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Center>
              </FormControl>
            )}
          </Stack>

          <ConfirmButton
            text="Confirm"
            type="submit"
          />
        </Stack>
      </form>
    </Stack>
  );
};

export default ProductDetail;