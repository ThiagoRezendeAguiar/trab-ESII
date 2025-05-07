import { Button, Card, CardBody, CardFooter, Heading, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../../contexts/CartContext";

type CardCartProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  initAmount: number;
  size: string;
}

const CardCart: React.FC<CardCartProps> = (props: CardCartProps) => {
  const { image, name, price, initAmount, size, id } = props;
  const { updateQuantity, removeItem } = useCart();
  const [amount, setAmount] = useState<number>(initAmount);

  // Atualizar quantidade no carrinho quando mudar localmente
  useEffect(() => {
    if (amount !== initAmount) {
      updateQuantity(id, size, amount);
    }
  }, [amount, id, size, initAmount, updateQuantity]);

  const calculatePrice = () => {
      const totalPrice = price * amount;
      return totalPrice.toFixed(2);
  }

  const handleDelete = () => {
    removeItem(id, size);
  }

  return (
    <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        w="100%"
        justifyContent="space-between"
        border="none"
        boxShadow="0 2px 0 rgba(0, 0, 0, 0.1)"
        >
        <Image
            objectFit='cover'
            maxW={{base: "100%", sm: "150px" }}
            h="auto"
            src={image}
            alt={name}
        />

        <Stack >
            <CardBody p="10px">
            <Heading size='md' color="secondary">{name}</Heading>

            <Text py='1' color="#959595" fontWeight="500" fontSize='md'>
              Size: {size}
            </Text>
            </CardBody>

            <CardFooter alignItems="center" gap={2} display="flex" flexDir={{base: "row", sm:"column", md: "row"}} p="10px">
                <Stack direction="row" alignItems="center" >
                    <Text color="#959595" fontWeight="400">Quantity</Text>
                    <NumberInput 
                        value={amount} 
                        onChange={(valueString) => setAmount(parseInt(valueString || '1'))}
                        min={1} 
                        max={50} 
                        maxW="100px"
                        >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <Button 
                        onClick={handleDelete}
                        bg="none"
                        _hover={{opacity: 0.8}}
                        px="10px"
                    >
                        <FaTrash color="gray"/>
                    </Button>
                </Stack>
                
                <Text fontWeight={600} fontSize="20px" textAlign="start" w={{base: "auto", sm: "100%", md: "auto" }}>
                    ${calculatePrice()}
                </Text>
            </CardFooter>
        </Stack>
    </Card>
  )
}

export default CardCart