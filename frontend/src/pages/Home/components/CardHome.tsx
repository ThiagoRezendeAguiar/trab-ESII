import { Button, Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type CardHomeProps = {
    id: string; 
    img: string;
    name: string;
    price: number;
}

const CardHome: React.FC<CardHomeProps> = (props: CardHomeProps) => {
   const { img, name, price} = props;

   const navigate = useNavigate(); // O navigate está indo para o nome do produto

  return (
    <Card maxW="300px" maxH="300px" boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"  borderRadius="20px" alignItems="center">
        <CardBody w="100%" alignItems="center" display="flex" flexDirection="column" p="10px">
           <Image
                src={img}
                alt={name}
                borderRadius='full'
                w="160px"
            />
            <Stack direction="row" alignItems="center" justifyContent="space-evenly" w="100%" pt="1" flexWrap="wrap">
                <Stack  display="flex" flexDirection="column">
                    <Heading 
                        fontSize={{base: '16px', sm: '20px'}}
                        whiteSpace="normal"
                        overflowWrap="break-word"
                        >
                        {name}
                    </Heading>
                    <Text color='#959595' fontSize="24px" fontWeight={500}>
                        ${price}
                    </Text>
                </Stack>
                <Button 
                    onClick={() => navigate('/product/' + props.id)} // esse id é o nome do produto
                    bg="none"
                    _hover={{opacity: 0.8}}
                    display={{base: "block", md:"flex" }}
                >
                    
                    <FaPlusCircle size="25" /> 
                </Button>
            </Stack> 
            
        </CardBody>
        </Card>
  )
}

export default CardHome