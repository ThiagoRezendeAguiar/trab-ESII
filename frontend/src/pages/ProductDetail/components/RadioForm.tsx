import {
  Center,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

type RadioFormProps = {
  priceSmall: number;
  priceMedium: number;
  priceLarge: number;
};

const RadioForm: React.FC<RadioFormProps> = (props: RadioFormProps) => {
  const { priceSmall, priceMedium, priceLarge } = props;

  const [value, setValue] = useState("");

  return (
    <FormControl>
      <FormLabel fontWeight="700" color="secondary">
        Size:
      </FormLabel>
      <Center>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="column" spacing={3}>
            <Radio
              value="Small"
              colorScheme="blackAlpha"
              _checked={{
                borderColor: "black",
                bg: "white",
                _before: {
                  content: '""',
                  w: "75%",
                  h: "75%",
                  borderRadius: "full",
                  bg: "black",
                },
              }}
            >
              Small - ${priceSmall.toFixed(2)}
            </Radio>
            <Radio
              value="Medium"
              colorScheme="blackAlpha"
              _checked={{
                borderColor: "black",
                bg: "white",
                _before: {
                  content: '""',
                  w: "75%",
                  h: "75%",
                  borderRadius: "full",
                  bg: "black",
                },
              }}
            >
              Medium - ${priceMedium.toFixed(2)}
            </Radio>
            <Radio
              value="Large"
              colorScheme="blackAlpha"
              _checked={{
                borderColor: "black",
                bg: "white",
                _before: {
                  content: '""',
                  w: "75%",
                  h: "75%",
                  borderRadius: "full",
                  bg: "black",
                },
              }}
            >
              Large - ${priceLarge.toFixed(2)}
            </Radio>
          </Stack>
        </RadioGroup>
      </Center>
    </FormControl>
  );
};

export default RadioForm;
