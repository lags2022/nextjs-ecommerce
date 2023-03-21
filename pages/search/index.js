import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { search } from "../../services/search";
import { useI18N } from "../../context/i18n_context";

export default function Component({ query, results }) {
  const { t } = useI18N();

  return (
    <>
      <Head>
        <title>xkcd - Result for {query}</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>

      <Layout>
        <h1>
          {t("SEARCH_RESULTS_TITLE", results.length, query)}
          {/* {results.length} Resultados para {query} */}
        </h1>
        {results.map((result) => (
          <Link
            key={result.id}
            href={`/comic/${result.id}`}
            className="flex flex-row content-center justify-start bg-slate-300 hover:bg-slate-50 "
          >
            <Image
              width="30"
              height="30"
              alt={result.alt}
              src={result.img}
              className=" rounded-full"
            />
            <div>
              <h2>{result.title}</h2>
            </div>
          </Link>
        ))}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { q = "" } = context.query;

  //mala practica jamas hacerlo. esto solo se realizara cuando se realice peticion a terceros, pero no a nuestra microservicio que hemos creado
  // const results = await fetch(`http://localhost:3000/api/search?q=${q}`).then(
  //   (res) => res.json()
  // );

  //llamar a la api de Algolia para buscar los resultados
  const { results } = await search({ query: q });

  return {
    props: {
      query: q,
      results,
    },
  };
}
