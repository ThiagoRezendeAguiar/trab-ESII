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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import img from "../../assets/images/margherita.png";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import ConfirmButton from "../../components/ConfirmButton";
import BackButton from "../../components/BackButton";
import api from "../../services/api";
import { Product } from "../../interfaces/Product";
import RadioForm from "./components/RadioForm";

const ProductDetail = () => {
  const { id } = useParams();

  const [amount, setAmount] = useState<number>(1);

  const [pizza, setPizza] = useState<Product | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

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
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando produtos...</h2>
      </div>
    );
  }

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

      <Stack alignItems="center" gap="5">
        <Image
          src={img}
          alt={id} // Id como nome do produto
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
            {" "}
            {pizza?.ingredients}
          </Text>
        </Stack>

        <Stack gap={5} w="100%" maxW="200px" pb="20px">
          {pizza && (
            <RadioForm
              priceSmall={pizza.price * 0.8 * amount}
              priceMedium={pizza.price * 1.0 * amount}
              priceLarge={pizza.price * 1.2 * amount}
            />
          )}
        </Stack>

        <ConfirmButton text="Confirm" redirect="/"></ConfirmButton>
      </Stack>
    </Stack>
  );
};

export default ProductDetail;
