import { Flex, useColorModeValue } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import ItemComponent from '../../components/item';
import Layout from '../../components/layout';
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
  const props: ItemPageProps = {
    item: {
      id,
      name: `Item ${id}`,
      price: 20,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius facilisis tempor. Suspendisse facilisis, libero eget aliquet fermentum, odio dui volutpat odio, at accumsan risus purus a tellus. Morbi pellentesque fermentum purus non aliquam. In molestie, augue non viverra facilisis, eros nulla tincidunt diam, sit amet tincidunt libero nisi sit amet tortor. Fusce magna lectus, tristique ac ipsum volutpat, feugiat finibus arcu. Aliquam erat volutpat. Sed tristique rhoncus leo, ut vulputate mi aliquam et.
      Vestibulum blandit porta nisl, non mattis ipsum fermentum vitae. Morbi a odio vitae est tincidunt luctus.`,
      email: 'test@stanford.edu',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/6/6f/Desk.jpg',
        'https://live.staticflickr.com/2490/4099800502_f2d8d3c56a_b.jpg'
      ]
    }
  };
  return { props };
};
