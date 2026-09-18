import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Poem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverGradient: string;
  coverImage: string;
  coverEmblem: string;
  featured: boolean;
  stanzas: string[][];
}

const poetryDirectory = path.join(process.cwd(), "content", "poetry");

function parsePoemFile(filename: string): Poem {
  const fullPath = path.join(poetryDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  // Split the poem into stanzas wherever there is a blank line.
  // Inside each stanza, every line remains a separate poetry line.
  const stanzas = content
    .trim()
    .split(/\r?\n\s*\r?\n/)
    .map((stanza) =>
      stanza
        .split(/\r?\n/)
        .map((line) => line.trimEnd())
    )
    .filter((stanza) => stanza.some((line) => line.trim() !== ""));

  return {
    slug: data.slug || filename.replace(/\.md$/, ""),
    title: data.title || "Untitled",
    date: String(data.date || ""),
    excerpt: data.excerpt || data.description || "",
  coverGradient:
  data.coverGradient ||
  "linear-gradient(135deg, #17191f 0%, #242936 45%, #090b10 100%)",
coverImage: data.coverImage || "",
coverEmblem: data.coverEmblem || "❦",
featured: data.featured === true,
    stanzas,
  };
}

export function getAllPoems(): Poem[] {
  if (!fs.existsSync(poetryDirectory)) {
    return [];
  }

  const files = fs
    .readdirSync(poetryDirectory)
    .filter((filename) => filename.endsWith(".md"));

  const poems = files.map(parsePoemFile);

  // Featured poems first.
  // Everything else follows by date / filename.
  return poems.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    return b.date.localeCompare(a.date);
  });
}

export function getPoemBySlug(slug: string): Poem | undefined {
  return getAllPoems().find((poem) => poem.slug === slug);
}

export function countLines(poem: Poem): number {
  return poem.stanzas.reduce(
    (total, stanza) => total + stanza.length,
    0
  );
}

export function readingTime(poem: Poem): number {
  const words = poem.stanzas
    .flat()
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 150));
}