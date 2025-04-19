import { Button, Card, CardBody, CardFooter, Heading, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

type CardCartProps = {
    id: string;
    image: string;
    name: string;
    price: number;
    initAmmount: number;
    size: string;
}

const CardCart: React.FC<CardCartProps> = (props: CardCartProps) => {

    const { image, name, price, initAmmount, size } = props;

    const [ammount, setAmmount] = useState<number>(initAmmount);

    const calculatePrice = () => {
        const totalPrice = price * ammount;
        return totalPrice.toFixed(2);
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
                        value={ammount} 
                        onChange={(valueString) => setAmmount(parseInt(valueString || '0'))}
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
                        onClick={() => (console.log('Delete card'))}
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