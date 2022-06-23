import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import FilePicker from 'chakra-ui-file-picker';
import { useSession } from 'next-auth/react';

import { Input, Textarea } from '../components/form';
import Layout from '../components/layout';

export default function AddItemPage() {
  const { data: session } = useSession();

  const inputProps = {
    color: useColorModeValue('gray.800', 'gray.200'),
    bg: useColorModeValue('gray.100', 'gray.600'),
    border: 0,
    _focus: {
      bg: useColorModeValue('gray.200', 'gray.800'),
      outline: 'none',
      boxShadow: 'none'
    }
  };

  return (
    <Layout title="Add Item" description="Add an item to SUPost">
      <Flex align="center" justify="center" py={12}>
        <Stack
          boxShadow="2xl"
          bg={useColorModeValue('white', 'gray.700')}
          rounded="xl"
          p={10}
          spacing={4}
          align="center"
          width="3xl"
        >
          <Heading>Add Item</Heading>
          {session ? (
            <>
              <Text fontSize="lg" color="gray.500">
                Sell an item on SUPost
              </Text>
              <Input type="text" placeholder="Item Name" />
              <Input type="number" placeholder="Price" />
              <Textarea placeholder="Item Description" height={200} />
              <FilePicker
                onFileChange={(fileList) => {
                  console.log(fileList);
                }}
                placeholder="Images"
                clearButtonLabel="Clear"
                multipleFiles={true}
                hideClearButton={false}
                inputProps={inputProps}
              />
              <Button colorScheme="red">Add Item</Button>
            </>
          ) : (
            <Text fontSize="lg" color="gray.500">
              Please sign in to sell an item on SUPost
            </Text>
          )}
        </Stack>
      </Flex>
    </Layout>
  );
}
