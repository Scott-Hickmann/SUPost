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
import { Item } from '../types';

interface ItemsPageProps {
  items: Item[];
}

export default function ItemsPage({ items }: ItemsPageProps) {
  return (
    <Layout title="Items" description="All SUPost items">
      <Flex align="center" justify="center" py={12}>
        <Stack
          boxShadow="2xl"
          bg={useColorModeValue('white', 'gray.700')}
          rounded="xl"
          p={10}
          spacing={8}
          align="center"
          width="3xl"
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
  const props: ItemsPageProps = {
    items: [
      {
        id: 'desk',
        name: 'Desk',
        price: 20,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius facilisis tempor. Suspendisse facilisis, libero eget aliquet fermentum, odio dui volutpat odio, at accumsan risus purus a tellus. Morbi pellentesque fermentum purus non aliquam. In molestie, augue non viverra facilisis, eros nulla tincidunt diam, sit amet tincidunt libero nisi sit amet tortor. Fusce magna lectus, tristique ac ipsum volutpat, feugiat finibus arcu. Aliquam erat volutpat. Sed tristique rhoncus leo, ut vulputate mi aliquam et.
      Vestibulum blandit porta nisl, non mattis ipsum fermentum vitae. Morbi a odio vitae est tincidunt luctus.`,
        email: 'alice@stanford.edu',
        images: ['https://upload.wikimedia.org/wikipedia/commons/6/6f/Desk.jpg']
      },
      {
        id: 'chair',
        name: 'Chair',
        price: 20,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius facilisis tempor. Suspendisse facilisis, libero eget aliquet fermentum, odio dui volutpat odio, at accumsan risus purus a tellus. Morbi pellentesque fermentum purus non aliquam. In molestie, augue non viverra facilisis, eros nulla tincidunt diam, sit amet tincidunt libero nisi sit amet tortor. Fusce magna lectus, tristique ac ipsum volutpat, feugiat finibus arcu. Aliquam erat volutpat. Sed tristique rhoncus leo, ut vulputate mi aliquam et.
      Vestibulum blandit porta nisl, non mattis ipsum fermentum vitae. Morbi a odio vitae est tincidunt luctus.`,
        email: 'bob@stanford.edu',
        images: [
          'https://live.staticflickr.com/2490/4099800502_f2d8d3c56a_b.jpg'
        ]
      }
    ]
  };
  return { props };
};
