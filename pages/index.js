import Head from "next/head";
import Image from "next/image";
import { Container, Card, Row, Text } from "@nextui-org/react";
import Header from "@/components/header";

export default function Home({ articles }) {
  return (
    <div>
      <Head>
        <title>PRUEBA 2 </title>
      </Head>
      <Header />
      <main>
        <h1>pruebas</h1>
        <Container>
          <Card css={{ $$cardColor: "$colors$primary" }}>
            <Card.Body>
              <Row justify="center" align="center">
                <Text h6 size={15} color="white" css={{ m: 0 }}>
                  NextUI gives you the best developer experience with all the
                  features you need for building beautiful and modern websites
                  and applications. mother fucker
                </Text>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  );
}
