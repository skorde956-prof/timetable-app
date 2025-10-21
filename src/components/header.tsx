"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();
  return (
    <header className="surface-glass theme-transition border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-[15px] md:text-base font-semibold tracking-tight">MindEase</Link>
        <nav className="flex items-center gap-3">
          <Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
          <Link href="/community/anxiety-support"><Button variant="ghost">Community</Button></Link>
          {!session?.user ? (
            <Link href="/login"><Button>Sign in</Button></Link>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">Hi, {session.user.name || session.user.email}</span>
              <Button variant="outline" onClick={()=>signOut({ callbackUrl: "/" })}>Sign out</Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
