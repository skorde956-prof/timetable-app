import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "next-auth";

export async function GET(_: Request, { params }: { params: { slug: string }}) {
  const community = await prisma.community.findUnique({ where: { slug: params.slug }});
  if (!community) return NextResponse.json({ posts: [] });

  const posts = await prisma.post.findMany({
    where: { communityId: community.id },
    orderBy: { createdAt: "desc" },
    include: { User: { select: { id: true, name: true, email: true } } },
    take: 100,
  });
  return NextResponse.json({ posts });
}

export async function POST(req: Request, { params }: { params: { slug: string }}) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { content } = await req.json();
  if (!content || !content.trim()) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const community = await prisma.community.findUnique({ where: { slug: params.slug }});
  if (!community) return NextResponse.json({ error: "Community not found" }, { status: 404 });

  const post = await prisma.post.create({
    data: {
      content: content.trim(),
      userId: session.user.id,
      communityId: community.id,
    },
    include: { User: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json({ post }, { status: 201 });
}
