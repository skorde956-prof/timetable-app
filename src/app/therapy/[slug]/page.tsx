import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const packs: Record<string, {title: string, steps: string[]}> = {
  "anxiety-reset": {
    title: "Anxiety Reset",
    steps: [
      "Box breathing (2 minutes)",
      "Thought labeling: name 3 worries",
      "Reframe one worry using evidence for/against",
      "Commit to a 5-minute grounding action"
    ]
  }
};

export default function TherapyPack({ params }: { params: { slug: string }}) {
  const pack = packs[params.slug] ?? {title: "Unknown Pack", steps: []};
  return (
    <Card className="rounded-2xl shadow-soft">
      <CardHeader><CardTitle>{pack.title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ol className="list-decimal pl-6 space-y-2">
          {pack.steps.map((s) => <li key={s}>{s}</li>)}
        </ol>
        <div className="flex gap-3">
          <Button>Mark complete</Button>
          <Link href="/dashboard"><Button variant="secondary">Back</Button></Link>
        </div>
      </CardContent>
    </Card>
  );
}
