import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import ItemComponent from '../../components/item';
import Layout from '../../components/layout';
import { connectToDatabase, documentToObject } from '../../database';
import { ItemModel } from '../../database/models/item';
import { Item } from '../../types';

interface ItemPageProps {
  item: Item;
}

export default function ItemPage({ item }: ItemPageProps) {
  return (
    <Layout
      title={item.name}
      description={item.description}
      image={item.images[0]}
    >
      <Flex align="center" justify="center" py={12}>
        <ItemComponent item={item} />
      </Flex>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = String(context.query.itemId);
  await connectToDatabase();
  const itemDoc = await ItemModel.findById(id);
  if (!itemDoc)
    return {
      redirect: {
        statusCode: 302,
        destination: `/notFound`
      }
    };
  const props: ItemPageProps = {
    item: documentToObject<Item>(itemDoc)
  };
  return { props };
};
