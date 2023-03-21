// For the search only version
import algoliasearch from "algoliasearch/lite";
//esta peticion no lo ve el cliente
const client = algoliasearch("FKXXCAJOUJ", "410e0592cccd6f4a29739467e1757ee4");
const index = client.initIndex("prod_xkcd");

//cache de memoria
const CACHE = {};

export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] };
  const { hits } = await index.search(query, {
    //attributesToRetrieve los parametros que queremos recuperar
    attributesToRetrieve: ["id", "title", "alt", "img"],
    hitsPerPage: 10,
  });
  CACHE[query] = hits;
  return { results: hits };
};
