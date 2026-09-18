import { notFound } from "next/navigation";
import { getPoemBySlug } from "../../../lib/poetry";
import PoemClient from "./PoemClient";

export default async function PoemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);

  if (!poem) {
    notFound();
  }

  return <PoemClient poem={poem} />;
}