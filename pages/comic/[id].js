import Head from "next/head";
import Image from "next/image";
import { readFile, readdir, stat } from "fs/promises";
import Link from "next/link";
import { basename } from "path";
import Layout from "@/components/Layout";

export default function Comic({
  img,
  alt,
  title,
  width,
  height,
  hasPrevious,
  hasNext,
  nextId,
  prevId,
}) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>
      <Layout>
        <main>
          <section className="max-w-md m-auto">
            <h1 className=" font-bold text-xl text-center mb-4">{title}</h1>
            <div className=" max-w-xs m-auto">
              <Image
                layout="responsive"
                width={width}
                height={height}
                src={img}
                alt={alt}
              />
            </div>
            <p>{alt}</p>
            <div className="flex justify-between mt-4 font-bold">
              {hasPrevious && (
                <Link className=" text-gray-600" href={`/comic/${prevId}`}>
                  ⬅️ Previous
                </Link>
              )}
              {hasNext && (
                <Link className=" text-gray-600" href={`/comic/${nextId}`}>
                  Next ➡️
                </Link>
              )}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const files = await readdir("./scraping/comics");

  const paths = files.map((file) => {
    const id = basename(file, ".json");
    return { params: { id } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./scraping/comics/${id}.json`, "utf-8");
  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./scraping/comics/${prevId}.json`),
    stat(`./scraping/comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      nextId,
      prevId,
    },
  };
}
