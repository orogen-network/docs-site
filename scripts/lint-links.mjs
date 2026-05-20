#!/usr/bin/env node
// Simple markdown link linter. Walks docs/, checks that local .md links resolve.
// Exits non-zero on broken links.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname, "docs");
const repoRoot = resolve(root, "..", "..");
const landingDownloads = resolve(repoRoot, "landing-site", "public", "downloads");

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".vitepress") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (name.endsWith(".md")) acc.push(p);
  }
  return acc;
}

const files = walk(root);
let broken = 0;

const linkRe = /\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

for (const f of files) {
  const body = readFileSync(f, "utf8");
  for (const match of body.matchAll(linkRe)) {
    const target = match[2];
    if (
      target.startsWith("#") ||
      target.startsWith("mailto:")
    ) {
      continue;
    }
    if (target.startsWith("http://") || target.startsWith("https://")) {
      const url = new URL(target);
      if (url.hostname === "orogen.network" && url.pathname.startsWith("/downloads/")) {
        const artifact = join(landingDownloads, url.pathname.replace(/^\/downloads\//, ""));
        try {
          statSync(artifact);
        } catch {
          broken++;
          console.error(`BROKEN: ${f} -> ${target} (missing local artifact ${artifact})`);
        }
      }
      continue;
    }
    // VitePress-style clean URLs: /foo/ -> docs/foo/index.md
    let resolved;
    if (target.startsWith("/")) {
      const t = target.replace(/^\//, "");
      resolved = t.endsWith("/")
        ? join(root, t, "index.md")
        : join(root, t.endsWith(".md") ? t : `${t}.md`);
      if (!t.endsWith("/") && !t.endsWith(".md")) {
        const indexCandidate = join(root, t, "index.md");
        try {
          statSync(indexCandidate);
          resolved = indexCandidate;
        } catch {
          // Keep the clean .md candidate; the main existence check below
          // reports the error if neither form exists.
        }
      }
    } else {
      resolved = join(dirname(f), target);
      if (!resolved.endsWith(".md")) {
        const tryClean = resolved.endsWith("/") ? `${resolved}index.md` : `${resolved}.md`;
        resolved = tryClean;
      }
    }
    try {
      statSync(resolved);
    } catch {
      broken++;
      console.error(`BROKEN: ${f} -> ${target} (resolved ${resolved})`);
    }
  }
}

if (broken > 0) {
  console.error(`${broken} broken link(s).`);
  process.exit(1);
} else {
  console.log(`ok: ${files.length} markdown files scanned.`);
}
