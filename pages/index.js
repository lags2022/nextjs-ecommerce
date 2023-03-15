import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>NewsApp - Home</title>
      </Head>
      <h1>Aprendiendo next</h1>
      {/* <style jsx>{`
        div {
          background: red;
          display: grid;
          place-content: center;
          height: 100vh;
        }
      `}</style> */}
      <Link href="/about">Ir a about</Link>

      {/* <button onClick={() => router.push("/article/2")}>jamas hacer este button</button> */}

    </div>
  );
}
