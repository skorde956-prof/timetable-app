"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MoodPage() {
  const [mood, setMood] = useState(0);
  const [note, setNote] = useState("");

  return (
    <Card className="rounded-2xl shadow-soft max-w-xl">
      <CardHeader><CardTitle>Log your mood</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <input type="range" min="-5" max="5" value={mood} onChange={(e)=>setMood(parseInt(e.target.value))} className="w-full" />
          <span className="font-mono w-10 text-center">{mood}</span>
        </div>
        <textarea placeholder="Optional note..." value={note} onChange={(e)=>setNote(e.target.value)} className="w-full p-3 rounded-xl border bg-white" />
        <Button onClick={()=>alert(`Saved mood ${mood} with note: ${note}`)}>Save</Button>
      </CardContent>
    </Card>
  );
}
