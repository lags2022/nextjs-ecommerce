import Head from "next/head";
import Image from "next/image";
import { Container, Card, Row, Text } from "@nextui-org/react";
import Header from "components/Header";
import fs from "fs/promises";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home({ latestComics }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h2 className="text-3xl font-bold text-center mb-10">Latest comics</h2>
        <section className="grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3">
          {latestComics.map((comic) => {
            return (
              <Link
                className="mb-4 pb-4 m-auto"
                href={`/comic/${comic.id}`}
                key={comic.id}
              >
                <h3 className=" font-bold text-sm text-center pb-4">
                  {comic.title}
                </h3>
                <Image
                  width={comic.width}
                  height={comic.height}
                  loyout="intrinsic"
                  objectFit="contain"
                  src={comic.img}
                  alt={comic.alt}
                />
              </Link>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
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
