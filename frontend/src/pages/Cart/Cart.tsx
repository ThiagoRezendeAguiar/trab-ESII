import { Center, Flex, Stack, Text, Box } from "@chakra-ui/react";
import CardCart from "./components/CardCart";
import ConfirmButton from "../../components/ConfirmButton";
import Navbar from "../../components/Navbar";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
const { items, totalPrice } = useCart();
const navigate = useNavigate();

// Redirecionar para home se o carrinho estiver vazio
if (items.length === 0) {
  return (
    <Stack minH="100vh" bg="#F1F1F1">
      <Navbar isAuthenticated={true} />
      <Center flexDirection="column" h="70vh" gap={5}>
        <Text fontSize="xl" fontWeight="bold">
          Your cart is empty
        </Text>
        <ConfirmButton text="Continue Shopping" redirect="/" />
      </Center>
    </Stack>
  );
}

return (
  <Stack minH="100vh" bg="#F1F1F1">
    <Navbar isAuthenticated={true} />
    <Flex
      direction="row"
      alignItems="center"
      position="relative"
      width="100%"
      p="30px"
    ></Flex>
    <Center px={{ base: "10px", md: "0" }}>
      <Stack
        maxW="container.md"
        w="100%"
        justifyContent="center"
        alignItems="center"
        gap={5}
      >
        {items.map((item) => (
          <CardCart
            key={`${item.id}-${item.size}`}
            id={item.id}
            name={item.name}
            price={item.price}
            initAmount={item.quantity}
            size={item.size}
            image={item.image}
          />
        ))}
      </Stack>
    </Center>

    <Center p="20px 0 50px 0">
      <Stack maxW="container.md" w={{ base: "90%", md: "100%" }} gap={5}>
        <Flex w="100%" justifyContent="space-between">
          <Text fontWeight="700" fontSize="xl">
            Total
          </Text>
          <Text fontWeight="500" fontSize="xl">
            $ {totalPrice.toFixed(2)}
          </Text>
        </Flex>

        <Center>
          <ConfirmButton
            text="Confirm Order"
            redirect="/profile/confirmation"
          />
        </Center>
      </Stack>
    </Center>
  </Stack>
);
};

export default Cart;