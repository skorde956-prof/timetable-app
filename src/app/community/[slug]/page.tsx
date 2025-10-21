"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Post = {
  id: string;
  content: string;
  createdAt: string;
  User: { id: string; name: string | null; email: string | null };
};

export default function Community({ params }: { params: { slug: string }}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated")
      router.push("/login?callbackUrl=" + encodeURIComponent(`/community/${params.slug}`));
  }, [status, params.slug, router]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/community/${params.slug}/posts`, { cache: "no-store" });
      const data = await res.json();
      setPosts(data.posts || []);
      setLoading(false);
    })();
  }, [params.slug]);

  async function submit() {
    if (!draft.trim()) return;
    const res = await fetch(`/api/community/${params.slug}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: draft }),
    });
    if (res.ok) {
      const { post } = await res.json();
      setPosts((prev) => [post, ...prev]);
      setDraft("");
    } else if (res.status === 401) {
      router.push("/login?callbackUrl=" + encodeURIComponent(`/community/${params.slug}`));
    }
  }

  if (status === "loading" || loading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <div className="grid gap-6 max-w-2xl">
      <Card className="rounded-2xl shadow-soft">
        <CardHeader>
          <CardTitle>#{params.slug}</CardTitle>
          <p className="text-muted-foreground text-sm">
            Signed in as {session?.user?.name || session?.user?.email}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              value={draft}
              onChange={(e)=>setDraft(e.target.value)}
              placeholder="Share something supportive..."
              className="flex-1 rounded-xl border p-3 bg-white"
            />
            <Button onClick={submit}>Post</Button>
          </div>

          <div className="space-y-3">
            {posts.map((p) => (
              <div key={p.id} className="rounded-xl bg-card border p-3">
                <div className="text-sm text-muted-foreground mb-1">
                  {p.User.name || p.User.email} · {new Date(p.createdAt).toLocaleString()}
                </div>
                <div>{p.content}</div>
              </div>
            ))}
            {posts.length === 0 && (
              <p className="text-sm text-muted-foreground">No posts yet. Start the conversation!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
