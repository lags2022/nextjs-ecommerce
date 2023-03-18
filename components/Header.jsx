import { Text } from "@nextui-org/react";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <Text small>
        next <span>xkcd</span>
      </Text>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
