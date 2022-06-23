import {
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

import { Item } from '../types';

interface ItemComponent {
  item: Item;
}

export default function ItemComponent({ item }: ItemComponent) {
  return (
    <Stack
      boxShadow="2xl"
      bg={useColorModeValue('white', 'gray.700')}
      rounded="xl"
      p={10}
      spacing={4}
      align="center"
      width="3xl"
    >
      <Heading>{item.name}</Heading>
      <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')}>
        {item.description}
      </Text>
      <Text fontSize="3xl">${item.price}</Text>
      <Link href={`mailto:${item.email}`} color="red.400">
        {item.email}
      </Link>
      {item.images.map((imageUrl) => (
        <Image key={imageUrl} src={imageUrl} alt={item.name} />
      ))}
    </Stack>
  );
}
