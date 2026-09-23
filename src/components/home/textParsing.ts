export interface InlineSegment {
  text: string;
  italic: boolean;
  gold: boolean;
}

/**
 * Parses a translation string containing inline markers like
 * `{i:italic text}` (serif accent) or `{a:italic gold text}` into segments.
 */
export const parseInline = (text: string): InlineSegment[] => {
  const segments: InlineSegment[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    const match = remaining.match(/^(.*?)\{([ia]):([^}]+)\}(.*)$/s);
    if (match) {
      const [, before, marker, content, after] = match;
      if (before) segments.push({ text: before, italic: false, gold: false });
      segments.push({ text: content, italic: true, gold: marker === "a" });
      remaining = after;
    } else {
      segments.push({ text: remaining, italic: false, gold: false });
      break;
    }
  }
  return segments;
};

/**
 * Like `parseInline`, but also splits the text into individual words for
 * per-word reveal animations.
 */
export const parseManifestoWords = (text: string): InlineSegment[] => {
  const words: InlineSegment[] = [];
  let remaining = text.trim();
  while (remaining.length > 0) {
    const match = remaining.match(/^(.*?)\{([ia]):([^}]+)\}(.*)$/);
    if (match) {
      const [, before, marker, content, after] = match;
      if (before.trim()) {
        before.trim().split(/\s+/).forEach((w) => {
          if (w) words.push({ text: w, italic: false, gold: false });
        });
      }
      words.push({ text: content, italic: true, gold: marker === "a" });
      remaining = after;
    } else {
      remaining.trim().split(/\s+/).forEach((w) => {
        if (w) words.push({ text: w, italic: false, gold: false });
      });
      break;
    }
  }
  return words;
};
