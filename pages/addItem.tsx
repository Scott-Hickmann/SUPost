import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import FilePicker from 'chakra-ui-file-picker';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Input, Textarea } from '../components/form';
import Layout from '../components/layout';
import { fetchApi } from '../helpers/fetchApi';
import { parseAddItemResponseData } from '../helpers/parsers/item';
import { AddItemRequestData, AddItemResponseData, Item } from '../types';

export default function AddItemPage() {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState<File[]>([]);

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

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      if (!session?.user?.email) return;
      console.log(data, images);
      const localItem: Item = {
        createdAt: new Date().toISOString(),
        name: data.name,
        description: data.description,
        price: parseInt(data.price),
        email: session.user.email,
        images: images.map((image) => image.name)
      };
      try {
        const { item, imagesUpload } = await fetchApi<
          AddItemResponseData,
          AddItemRequestData
        >({
          path: '/items/add',
          payload: { item: localItem },
          parser: parseAddItemResponseData
        });

        await Promise.all(
          imagesUpload.map(async ({ url, fields }, index) => {
            const formData = new FormData();
            Object.entries({
              ...fields,
              file: images[index]
            }).forEach(([key, value]) => {
              formData.append(key, value);
            });
            const upload = await fetch(url, {
              method: 'POST',
              body: formData,
              mode: 'no-cors'
            });
            console.log('upload', upload);
          })
        );
        router.replace(`/items/${item.id}`);
      } catch (error) {
        alert(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session, images]
  );

  return (
    <Layout title="Add Item" description="Add an item to SUPost">
      <Flex align="center" justify="center" px={4} py={12}>
        <Stack
          boxShadow="2xl"
          bg={useColorModeValue('white', 'gray.700')}
          rounded="xl"
          p={{ base: 4, md: 10 }}
          spacing={{ base: 4, md: 8 }}
          align="center"
          maxW="3xl"
          width="full"
        >
          <Heading>Add Item</Heading>
          {session ? (
            <>
              <Text fontSize="lg" color="gray.500">
                Sell an item on SUPost
              </Text>
              <Input
                type="text"
                placeholder="Item Name"
                {...register('name', { required: true })}
              />
              <Input
                type="number"
                placeholder="Price"
                {...register('price', { required: true })}
              />
              <Textarea
                placeholder="Item Description"
                height={200}
                {...register('description', { required: true })}
              />
              <FilePicker
                onFileChange={(fileList) => {
                  setImages(fileList);
                }}
                placeholder="Images"
                clearButtonLabel="Clear"
                multipleFiles={true}
                hideClearButton={false}
                inputProps={inputProps}
              />
              <Button colorScheme="red" onClick={handleSubmit(onSubmit)}>
                Add Item
              </Button>
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
