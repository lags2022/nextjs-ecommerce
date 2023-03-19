export default function Search({ prop }) {
  return <>null</>;
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q } = query;
  const prop = q;

  //llamar a la api de Algolia para buscar los resultados
  return {
    props: {
      prop,
    },
  };
}
