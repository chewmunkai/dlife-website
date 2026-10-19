import React, { type ReactNode } from "react";

/**
 * Inline emphasis in CMS text: *italic* and **bold**, nothing else. The
 * design's headings put their second phrase in italics ("Support built around
 * *real life needs*"), and the founders' copy bolds the two names; this is
 * enough for both without letting HTML into a text field.
 */
export function Rich({ text }: { text?: string }): ReactNode {
  if (!text) return null;
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(m[1] !== undefined ? <b key={k++}>{m[1]}</b> : <i key={k++}>{m[2]}</i>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** The same text with the markup removed, for alt text, aria labels and structured data. */
export const plain = (text?: string) => (text ?? "").replace(/\*\*(.+?)\*\*|\*(.+?)\*/g, (_, b, i) => b ?? i);
