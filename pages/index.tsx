import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import Layout from '../components/layout';

export default function HomePage() {
  return (
    <Layout title="SUPost" description="Sell your stuff">
      <Container maxW="5xl">
        <Stack
          textAlign="center"
          align="center"
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight="110%"
          >
            SU
            <Text as="span" color="red">
              Post
            </Text>
          </Heading>
          <Text color="gray.500" maxW="3xl">
            Sell your stuff. Find affordable items. Keep your carbon footprint
            low. SUPost is a platform for Stanford students to buy and sell
            items from each other.
          </Text>
          <Stack spacing={6} direction="row">
            <NextLink href="/addItem" passHref>
              <Button px={6} colorScheme="red">
                Sell an Item
              </Button>
            </NextLink>
            <NextLink href="/items" passHref>
              <Button px={6}>Buy an Item</Button>
            </NextLink>
          </Stack>
        </Stack>
      </Container>
    </Layout>
  );
}
