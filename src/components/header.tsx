import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">🧠 MindEase</Link>
        <nav className="flex items-center gap-3">
          <Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
          <Link href="/community/anxiety-support"><Button variant="ghost">Community</Button></Link>
          <a href="https://github.com/" target="_blank" rel="noreferrer"><Button>Sign in</Button></a>
        </nav>
      </div>
    </header>
  );
}
