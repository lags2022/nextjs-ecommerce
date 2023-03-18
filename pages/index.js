import Head from "next/head";
import Image from "next/image";
import { Container, Card, Row, Text } from "@nextui-org/react";
import Header from "@/components/header";
import fs from "fs/promises";

export default function Home({ latestComics }) {
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

export async function getStaticProps(context) {
  //aqui la ruta me tiraba un error indicaba que no existia la ruta, se recomienda colocar ruta no partiendo desde el archivo index.js(../scraping/comics) sino de la ruta principal (./scraping/comics)
  const files = await fs.readdir("./scraping/comics");
  const lastestComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = lastestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./scraping/comics/${file}`, "utf8");
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  console.log(latestComics);

  return {
    props: {
      latestComics,
    },
  };
}
