"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(()=>({}));
      setErr(data?.error || "Unable to register");
      return;
    }
    router.push("/login");
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="rounded-2xl shadow-soft">
        <CardHeader><CardTitle>Create account</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <input className="w-full p-3 rounded-xl border bg-white" placeholder="Name (optional)"
              value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="email" className="w-full p-3 rounded-xl border bg-white" placeholder="Email"
              value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <input type="password" className="w-full p-3 rounded-xl border bg-white" placeholder="Password"
              value={password} onChange={(e)=>setPassword(e.target.value)} required />
            {err && <p className="text-red-600 text-sm">{err}</p>}
            <div className="flex gap-3">
              <Button type="submit">Create</Button>
              <a className="underline text-sm" href="/login">Back to sign in</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
