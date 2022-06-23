import { HStack, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

import { Item } from '../types';

interface ItemComponent {
  item: Item;
}

export default function ItemComponent({ item }: ItemComponent) {
  return (
    <NextLink href={`/item/${item.id}`} passHref>
      <HStack
        cursor="pointer"
        borderColor={useColorModeValue('gray.200', 'gray.500')}
        borderRadius={'xl'}
        borderWidth={2}
        rounded="xl"
        spacing={0}
        align="center"
        justifyContent="space-between"
        height={100}
        width="full"
        overflow="hidden"
      >
        <HStack spacing={4} px={8} fontSize="xl">
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
          />
        )}
      </HStack>
    </NextLink>
  );
}
