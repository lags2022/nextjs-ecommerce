import Head from "next/head";
import Image from "next/image";
import fs from "fs/promises";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useI18N } from "@/context/i18n_context";

export default function Home({ latestComics }) {
  const { t } = useI18N();
  return (
    <>
      <Head>
        {/* <title>xkcd - Comics for developers</title> */}
        <meta name="description" content="Comics for developers" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Layout>
        <main>
          <h2 className="text-3xl font-bold text-center mb-10">
            {/* Latest comics */}
            {t("LATEST_COMICS")}
          </h2>
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
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  //aqui la ruta me tiraba un error indicaba que no existia la ruta, se recomienda colocar ruta no partiendo desde el archivo index.js(../scraping/comics) sino de la ruta principal (./scraping/comics)
  const files = await fs.readdir("./scraping/comics");
  const lastestComicsFiles = files.slice(-9, files.length); //aqui tienes que poner -10 para que salgan los 9 ulitmos. estaba antes -8 pa que salgan los 8 ultimos. pero como dentro de la carpeta "./scraping/comics" tbm esta index.json el files.length saldra unos mas. pero ya lo quite en el deploy para evitar problemas.

  const promisesReadFiles = lastestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./scraping/comics/${file}`, "utf8");
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  // console.log(latestComics);

  return {
    props: {
      latestComics,
    },
  };
}
