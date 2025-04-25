import { Button } from "@chakra-ui/react";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type BackButtonProps = {
  url: string;
};

const BackButton: React.FC<BackButtonProps> = (props: BackButtonProps) => {
  const { url } = props;
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(url)}
      p="30px"
      m={{ base: "0", md: "10px" }}
      maxW="80px"
      _hover={{ opacity: 0.8 }}
      justifyContent="start"
      bg="none"
      position="absolute"
      left="0"
    >
      <FaArrowLeft size={20} />
    </Button>
  );
};

export default BackButton;
