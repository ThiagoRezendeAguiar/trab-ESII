import { Button } from "@chakra-ui/react"

type ButtonProps = {
    text: string;
    onClick: () => void;
}

const ConfirmButton: React.FC<ButtonProps> = (props: ButtonProps) => {

    const { text } = props;
  return (
    <Button
     borderRadius={0}
     maxW="375px"
     w="90%"
     bg="#000"
     color="#fff"
     fontWeight={600}
     p="10px"
    >
        {text}
    </Button>
  )
}

export default ConfirmButton