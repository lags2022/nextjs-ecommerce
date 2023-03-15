import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import PageLayout from "@/components/PageLoyout";
// import { useEffect, useState } from "react";

export default function Home({ articles }) {
  // const [state, setState] = useState([]);
  // const [articles, setArticles] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     "https://newsapi.org/v2/everything?q=apple&from=2023-03-14&to=2023-03-14&sortBy=popularity&apiKey=b5dbd67693af4df080df4680eb8b164b"
  //   )
  //     .then((res) => res.json())
  //     .then(({ articles }) => setArticles(articles));
  // }, []);

  return (
    <PageLayout title="NewsApp - Home">
      <div className={styles.container}>
        {!articles.length ? (
          <p>No tenemos articulos</p>
        ) : (
          articles.map((art, index) => (
            <div key={index}>
              <Image
                alt={`Image for the article ${art.title} `}
                src={art.urlToImage}
                width={450}
                height={300}
                quality={50}
                priority={index < 2}
                layout="responsive"
                // placeholder="blur"
              />
              <h2>{art.title}</h2>
              <p>{art.description}</p>
            </div>
          ))
        )}
        <Link href="/about">Ir a about</Link>
      </div>
    </PageLayout>
  );
}

//N requests -> se ejecuta 1 vez en build time( o para refrescar la pagina)
export async function getStaticProps() {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b5dbd67693af4df080df4680eb8b164b"
  );
  const { articles } = await response.json();
  return {
    props: {
      articles,
    },
  };
}

// este metodo getsetServerSideProps se ejecuta en el servidor.
// N requests -> se ejecuta N veces
// para datos que necesitas que sean MUY lives
// tiene demasiados datos dinamicos
// export async function getServerSideProps(context) {
//   const response = await fetch(
//     "https://newsapi.org/v2/everything?q=apple&from=2023-03-14&to=2023-03-14&sortBy=popularity&apiKey=b5dbd67693af4df080df4680eb8b164b"
//   );
//   const { articles } = await response.json();
//   return {
//     props: {
//       articles,
//     },
//   };
// }

// const router = useRouter();

// {
//   /* <Head>
//           <title>NewsApp - Home</title>
//         </Head>
//          */
// }
// {
//   /* <style jsx>{`
//         div {
//           background: red;
//           display: grid;
//           place-content: center;
//           height: 100vh;
//         }
//       `}</style> */
// }

// {
//   /* <button onClick={() => router.push("/article/2")}>jamas hacer este button</button> */
// }

// https://newsapi.org/v2/everything?q=apple&from=2023-03-14&to=2023-03-14&sortBy=popularity&apiKey=b5dbd67693af4df080df4680eb8b164b
