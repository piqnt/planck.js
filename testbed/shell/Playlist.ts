import { playlist, currentPlay } from "planck/testbed";

declare const SHELL_URL: string;

// todo: this only works for last findModules
const playlistMap: Record<string, () => Promise<unknown>> = {};
/** each play's source, for the shell's code view; registered beside the modules by findSources */
const sourceMap: Record<string, () => Promise<string>> = {};

const excludePath = [".", "..", "src", "packages"];

function urlToKey(url: string) {
  const prefix = SHELL_URL + "/";
  if (url && url.startsWith(prefix)) {
    // GitHub Pages redirects a directory url to its trailing-slash form, which leaves one here
    return url.substring(prefix.length).replace(/\/$/, "");
  }
}

function keyToUrl(key: string) {
  return SHELL_URL + "/" + key;
}

function keyOf(path: string) {
  let parts = path.split("/");
  let filename = parts.pop();
  parts = parts.filter((part) => !excludePath.includes(part));
  filename = filename.split(".", 2)[0];
  parts.push(filename);
  return parts.join("/");
}

export function findModules<L>(modules: Record<string, () => Promise<L>>) {
  Object.entries(modules).forEach(([path, module]) => {
    const key = keyOf(path);

    if (playlistMap[key]) {
      console.warn("Duplicate module key skipped", key, path);
      return;
    }
    playlist.push({
      key,
      path,
      url: keyToUrl(key),
    });
    playlistMap[key] = module;
  });
}

/**
 * The source of each play, keyed as findModules keys them: the same glob with `query: "?raw"`.
 * Without it the shell's code view has nothing to show.
 */
export function findSources(sources: Record<string, () => Promise<string>>) {
  Object.entries(sources).forEach(([path, source]) => {
    const key = keyOf(path);
    if (!sourceMap[key]) sourceMap[key] = source;
  });
}

/** the source behind a play, or null when none was registered */
export async function loadSource(key: string): Promise<string | null> {
  const source = key && sourceMap[key];
  return source ? await source() : null;
}

export async function loadModule() {
  const key = urlToKey(document.location.pathname);
  if (!key) {
    console.warn("No module specified in url", document.location.pathname, SHELL_URL);
    return false;
  }

  const loader = playlistMap[key];
  if (!loader) {
    console.error("Module not found", key);
    return false;
  }

  currentPlay.value = playlist.find((play) => play.key === key);
  try {
    console.log("Module loading", key);
    await loader();
  } catch (error) {
    console.error("Failed to load module", key, error);
  }
  return true;
}
