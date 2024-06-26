import {
  Input as ChakraInput,
  InputProps,
  Textarea as ChakraTextarea,
  TextareaProps,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return (
      <ChakraInput
        ref={ref}
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
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    return (
      <ChakraTextarea
        ref={ref}
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
);
