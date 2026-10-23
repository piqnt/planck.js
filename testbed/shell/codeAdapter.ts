import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import { createHighlightJsAdapter } from "@mantine/code-highlight";

// highlight.js core with one language registered, rather than the whole package: the code view
// only ever shows this repo's examples. Mantine 8 ships no highlighter of its own, so the shell
// hands it this adapter (see ShellLayout).
hljs.registerLanguage("typescript", typescript);

export const codeAdapter = createHighlightJsAdapter(hljs);
