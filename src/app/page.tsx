import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid gap-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">MindEase</h1>
        <p className="text-muted-foreground text-lg">AI micro-therapy. Safe communities. Uplifting group care.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/dashboard"><Button>Open App</Button></Link>
          <Link href="/login"><Button variant="secondary">Sign in</Button></Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {[
          {title: "5–10 min sessions", desc: "Bite-sized, evidence-informed micro-therapy."},
          {title: "Community spaces", desc: "Topic channels, AI-assisted moderation."},
          {title: "Group sessions", desc: "Coach-led, with AI summaries & follow-ups."},
        ].map((f) => (
          <Card key={f.title} className="shadow-soft rounded-2xl">
            <CardHeader><CardTitle>{f.title}</CardTitle></CardHeader>
            <CardContent className="text-muted-foreground">{f.desc}</CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
