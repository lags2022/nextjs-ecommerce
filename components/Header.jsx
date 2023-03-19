import { Container, Text } from "@nextui-org/react";
import Link from "next/link";

export default function Header() {
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
            <Link className="text-sm font-semibold" href="/search">
              Search
            </Link>
          </li>
          {/* </Container> */}
        </ul>
      </nav>{" "}
    </header>
  );
}
