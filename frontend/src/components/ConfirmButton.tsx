import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

type ButtonProps = {
    text: string;
    redirect: string;
    type?: 'button' | 'submit' | 'reset';
    whiteMode?: boolean
}

const ConfirmButton: React.FC<ButtonProps> = (props: ButtonProps) => {

    const { text, redirect, type, whiteMode } = props;

    const navigate = useNavigate();


  return (
    <Button
     borderRadius={0}
     maxW="375px"
     w="90%"
     bg={whiteMode ? "#fff" : "#000"}
     color={whiteMode ? "#000" : "#fff"}
     border={whiteMode ? "2px solid #000" : 'none'}
     fontWeight={600}
     p="10px"
     onClick={() => navigate(redirect)}
     type={type}
    >
        {text}
    </Button>
  )
}

export default ConfirmButton