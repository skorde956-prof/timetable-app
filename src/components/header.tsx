"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();
  return (\n    <header className="surface-glass theme-transition border-b">\n      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">\n        <Link href="/" className="text-[15px] md:text-base font-semibold tracking-tight">MindEase</Link>\n        <nav className="flex items-center gap-3">\n          <Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link>\n          <Link href="/community/anxiety-support"><Button variant="ghost">Community</Button></Link>\n          {!session?.user ? (\n            <Link href="/login"><Button>Sign in</Button></Link>\n          ) : (\n            <>\n              <span className="text-sm text-muted-foreground">Hi, {session.user.name || session.user.email}</span>\n              <Button variant="outline" onClick={()=>signOut({ callbackUrl: \"/\" })}>Sign out</Button>\n            </>\n          )}\n        </nav>\n      </div>\n    </header>\n  );
}


