import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.JS</h1>
      <Link href={"/dashboard"}>
        <h3>Go to Dashboard</h3>
      </Link>
    </div>
  );
}
