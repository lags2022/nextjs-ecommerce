import Layout from "@/components/Layout";
import Head from "next/head";

export default function Component({ query }) {
  return (
    <>
      <Head>
        <title>xkcd - Result for {query}</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>

      <Layout>
        <h1>{query}</h1>
        <p>lorem lorem lorem lorem lorem </p>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { q = "" } = context.query;
  console.log(q);

  //llamar a la api de Algolia para buscar los resultados
  return {
    props: {
      query: q,
    },
  };
}
