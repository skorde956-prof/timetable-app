import { auth } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard");

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-semibold">Welcome back 👋</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-soft">
          <CardHeader><CardTitle>Start a micro-therapy</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">Try “Anxiety Reset” — 8 minutes.</p>
            <Link href="/therapy/anxiety-reset"><Button>Begin</Button></Link>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-soft">
          <CardHeader><CardTitle>Today’s mood</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">Log your mood to track trends.</p>
            <Link href="/mood"><Button variant="secondary">Log mood</Button></Link>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-soft">
          <CardHeader><CardTitle>Community</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">Join discussions in Anxiety Support.</p>
            <Link href="/community/anxiety-support"><Button variant="outline">Open community</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
