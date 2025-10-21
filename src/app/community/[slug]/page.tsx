"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Community({ params }: { params: { slug: string }}) {
  const [posts, setPosts] = useState<string[]>([
    "What helps you before exams?",
    "Breathing technique that actually works?",
  ]);
  const [draft, setDraft] = useState("");

  return (
    <div className="grid gap-6 max-w-2xl">
      <Card className="rounded-2xl shadow-soft">
        <CardHeader><CardTitle>#{params.slug}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {posts.map((p, i)=> (
              <div key={i} className="rounded-xl bg-card border p-3">{p}</div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={draft} onChange={(e)=>setDraft(e.target.value)} placeholder="Share something supportive..." className="flex-1 rounded-xl border p-3 bg-white" />
            <Button onClick={()=>{ if(draft){ setPosts([draft, ...posts]); setDraft(""); }}}>Post</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
