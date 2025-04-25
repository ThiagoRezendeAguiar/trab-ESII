import {
  Box,
  Flex,
  FormControl as DefaultFormControl,
  Input,
} from "@chakra-ui/react";
import React from "react";

type FormControlProps = {
  id: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
};

const FormControl: React.FC<FormControlProps> = (props: FormControlProps) => {
  const { id, placeholder, type, icon } = props;

  return (
    <DefaultFormControl isRequired>
      <Flex align="center" gap={3}>
        {icon && (
          <Box w="24px" textAlign="center">
            {icon}
          </Box>
        )}
        <Box flex={1}>
          <Input
            id={id}
            placeholder={placeholder}
            type={type}
            bg="gray.100"
            _hover={{ bg: "gray.50" }}
            _focus={{
              bg: "white",
            }}
            size="md"
            variant="filled"
          />
        </Box>
      </Flex>
    </DefaultFormControl>
  );
};

export default FormControl;
