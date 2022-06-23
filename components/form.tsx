import {
  Input as ChakraInput,
  InputProps,
  Textarea as ChakraTextarea,
  TextareaProps,
  useColorModeValue
} from '@chakra-ui/react';

export function Input(props: InputProps) {
  return (
    <ChakraInput
      color={useColorModeValue('gray.800', 'gray.200')}
      bg={useColorModeValue('gray.100', 'gray.600')}
      border={0}
      _focus={{
        bg: useColorModeValue('gray.200', 'gray.800'),
        outline: 'none',
        boxShadow: 'none'
      }}
      {...props}
    />
  );
}

export function Textarea(props: TextareaProps) {
  return (
    <ChakraTextarea
      pb={4}
      color={useColorModeValue('gray.800', 'gray.200')}
      bg={useColorModeValue('gray.100', 'gray.600')}
      border={0}
      resize="none"
      _focus={{
        bg: useColorModeValue('gray.200', 'gray.800'),
        outline: 'none',
        boxShadow: 'none'
      }}
      {...props}
    />
  );
}
