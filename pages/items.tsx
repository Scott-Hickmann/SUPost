import {
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import ItemPreviewComponent from '../components/itemPreview';
import Layout from '../components/layout';
import { connectToDatabase, documentToObject } from '../database';
import { ItemModel } from '../database/models/item';
import { Item } from '../types';

interface ItemsPageProps {
  items: Item[];
}

export default function ItemsPage({ items }: ItemsPageProps) {
  return (
    <Layout title="Items" description="All SUPost items">
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
          <Heading>Items</Heading>
          <VStack spacing={4} width="full">
            {items.map((item) => (
              <ItemPreviewComponent key={item.id} item={item} />
            ))}
          </VStack>
        </Stack>
      </Flex>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await connectToDatabase();
  const items: Item[] = (await ItemModel.find()).map(documentToObject);
  const props: ItemsPageProps = {
    items
  };
  return { props };
};
