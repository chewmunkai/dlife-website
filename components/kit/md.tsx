import React, { type ReactNode } from "react";
import { link } from "../../lib/asset";

/**
 * The Text block's formatting: a deliberately small Markdown subset, rendered
 * as React elements (never as HTML), so text typed into the CMS can't inject
 * markup or scripts.
 *
 *   Blank line        → new paragraph
 *   "- " at line start → bullet list
 *   **bold**  *italic*  [label](/page or https://…)
 *
 * Links only go to site paths ("/…", "#…") or https URLs; anything else is
 * shown as plain text.
 */
export function Markdown({ text }: { text?: string }) {
  if (!text) return null;
  const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((l) => /^\s*[-•]\s+/.test(l))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\s*[-•]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            {lines.map((l, j) => (
              <React.Fragment key={j}>
                {j > 0 && <br />}
                {inline(l)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}

const SAFE_HREF = /^(\/[^\s]*|#[\w-]*|https:\/\/[^\s]+)$/;

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      const href = m[2];
      if (SAFE_HREF.test(href)) {
        const external = href.startsWith("https://");
        out.push(
          <a key={k++} href={external ? href : link(href)} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {m[1]}
          </a>,
        );
      } else out.push(m[0]);
    } else if (m[3] !== undefined) out.push(<b key={k++}>{m[3]}</b>);
    else out.push(<i key={k++}>{m[4]}</i>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
