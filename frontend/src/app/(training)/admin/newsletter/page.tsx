import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import NewsletterAdmin from "./view";

export const metadata: Metadata = { title: "뉴스레터 관리 · Plateer AI Labs" };

function newsletterFiles() {
  const directory = path.join(process.cwd(), "public", "admin");
  return fs
    .readdirSync(directory)
    .filter((name) => /^XGEN_Newsletter_.*\.html$/.test(name))
    .map((name) => ({
      name,
      modified: fs.statSync(path.join(directory, name)).mtimeMs,
    }))
    .sort(
      (a, b) => b.modified - a.modified || b.name.localeCompare(a.name, "ko"),
    )
    .map(({ name }) => ({
      name,
      label: name
        .replace(/\.html$/, "")
        .replace(/^XGEN_Newsletter_/, "")
        .replaceAll("_", " "),
      url: `/admin/${encodeURIComponent(name)}`,
    }));
}

export default function Page() {
  return <NewsletterAdmin files={newsletterFiles()} />;
}
