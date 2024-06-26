import { HStack, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

import { Item } from '../types';

interface ItemComponent {
  item: Item;
}

export default function ItemComponent({ item }: ItemComponent) {
  return (
    <NextLink href={`/items/${item.id}`} passHref>
      <HStack
        cursor="pointer"
        borderColor={useColorModeValue('gray.200', 'gray.500')}
        borderRadius={'xl'}
        borderWidth={2}
        rounded="xl"
        spacing={4}
        align="center"
        justifyContent="space-between"
        width="full"
        overflow="hidden"
      >
        <HStack
          spacing={{ base: 2, md: 4 }}
          px={{ base: 4, md: 8 }}
          fontSize="xl"
          height={{ base: 50, md: 100 }}
        >
          <Text fontWeight="bold">{item.name}</Text>
          <Text>${item.price}</Text>
          <Link href={`mailto:${item.email}`} color="red.500">
            {item.email}
          </Link>
        </HStack>
        {item.images.length > 0 && (
          <Image
            src={item.images[0]}
            alt={item.name}
            height={100}
            width={100}
            objectFit="cover"
            display={{ base: 'none', md: 'inline' }}
          />
        )}
      </HStack>
    </NextLink>
  );
}
