"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    const res = await signIn("credentials", {
      email, password, redirect: false,
    });
    if (res?.error) setErr(res.error);
    else router.push(params.get("callbackUrl") || "/dashboard");
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="rounded-2xl shadow-soft">
        <CardHeader><CardTitle>Sign in</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-3 rounded-xl border bg-white"
              value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="w-full p-3 rounded-xl border bg-white"
              value={password} onChange={(e)=>setPassword(e.target.value)} required />
            {err && <p className="text-red-600 text-sm">{err}</p>}
            <div className="flex gap-3">
              <Button type="submit">Sign in</Button>
              <a className="underline text-sm" href="/register">Create an account</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
