import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-4 max-w-xl m-auto">
      <Link href="https://xkcd.com/" target="_blank" rel="noopener noreferrer">
        All comics by xkcd
      </Link>
    </footer>
  );
}
