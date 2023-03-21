import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  //locale es el idioma actual y locales es un array con todos los idiomas configurados
  const { locale, locales } = useRouter();

  const restOfLocales = locales.filter((l) => l !== locale);
  //esta funcion solo es para mostrar el idioma actual y los demas idiomas
  // const showLocale = () => {
  //   const restOfLocales = locales.filter((l) => l !== locale);
  //   return {
  //     selectedLocale: locale,
  //     restOfLocales,
  //   };
  // };

  const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    const q = getValue();
    if (!q) return;
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => setResults(searchResults));
  };
  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
      <h1 className="font-bold">
        <Link className=" transition hover:opacity-80" href="/">
          next<span className="font-light">xkcd</span>
        </Link>
      </h1>
      <nav>
        <ul className="flex flex-row gap-2">
          {/* <Container display="flex" direction="row" responsive gap={4}> */}
          {/* //parece que el gap no sale en el navegador */}
          <li>
            <Link className="text-sm font-semibold" href="/">
              Home
            </Link>
          </li>

          <li>
            <Link href="/" locale={restOfLocales[0]}  >{restOfLocales[0]}</Link>
          </li>

          <li>
            {/* <Link className="text-sm font-semibold" href="/search">
            Search
            </Link> */}
            <input
              className=" rounded-3xl border-gray-400 px-2 py-1 border text-xs "
              ref={searchRef}
              type="search"
              onChange={handleChange}
            />
            <div className="relative z-10 ">
              {
                //mejor colocar boolean para que no salga 0 en el input
                Boolean(results.length) && (
                  <div className="absolute top-0 left-0">
                    <ul className="w-full border border-gray-50 rounded-lg shadow-xl z-50 bg-white overflow-hidden ">
                      <li className="m-0" key="all-results">
                        <Link
                          href={`/search?q=${getValue()}`}
                          className="italic block px-2 py-1 text-sm font-semibold hover:bg-slate-200 text-ellipsis overflow-hidden whitespace-nowrap text-gray-400 "
                        >
                          Ver {results.length} resultados
                        </Link>
                      </li>

                      {results.map((result) => {
                        return (
                          <li className="m-0" key={result.id}>
                            <Link
                              href={`/comic/${result.id}`}
                              className=" block px-2 py-1 text-sm font-semibold hover:bg-slate-200 text-ellipsis overflow-hidden whitespace-nowrap "
                            >
                              {result.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )
              }
            </div>
          </li>
          {/* </Container> */}
        </ul>
      </nav>
    </header>
  );
}
