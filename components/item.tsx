import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

import { fetchApi } from '../helpers/fetchApi';
import { Item, RemoveItemRequestData } from '../types';

interface ItemComponent {
  item: Item;
}

export default function ItemComponent({ item }: ItemComponent) {
  const router = useRouter();
  const { data: session } = useSession();

  const isOwner = session?.user?.email === item.email;

  const deleteItem = useCallback(async () => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    if (!item.id) return;
    try {
      await fetchApi<undefined, RemoveItemRequestData>({
        path: '/items/remove',
        payload: { itemId: item.id }
      });
      router.replace('/items');
    } catch (error) {
      alert(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
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
      <HStack justify="space-between" width="full">
        <Box width={10} />
        <Heading>{item.name}</Heading>
        {isOwner ? (
          <Button width={10} onClick={deleteItem}>
            <DeleteIcon />
          </Button>
        ) : (
          <Box width={10} />
        )}
      </HStack>
      <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')}>
        {item.description}
      </Text>
      <Text fontSize="3xl">${item.price}</Text>
      <Link href={`mailto:${item.email}`} color="red.500">
        {item.email}
      </Link>
      {item.images.map((imageUrl) => (
        <Image key={imageUrl} src={imageUrl} alt={item.name} />
      ))}
    </Stack>
  );
}
