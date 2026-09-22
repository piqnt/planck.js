import { playlist, currentPlay } from "planck/testbed";

declare const SHELL_URL: string;

// todo: this only works for last findModules
const playlistMap: Record<string, () => Promise<unknown>> = {};

const excludePath = [".", "..", "src", "packages"];

function urlToKey(url: string) {
  const prefix = SHELL_URL + "/";
  if (url && url.startsWith(prefix)) {
    return url.substring(prefix.length);
  }
}

function keyToUrl(key: string) {
  return SHELL_URL + "/" + key;
}

export function findModules<L>(modules: Record<string, () => Promise<L>>) {
  Object.entries(modules).forEach(([path, module]) => {
    let parts = path.split("/");
    let filename = parts.pop();
    parts = parts.filter((part) => !excludePath.includes(part));
    filename = filename.split(".", 2)[0];
    parts.push(filename);
    const key = parts.join("/");

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
  document.title = key;
  try {
    console.log("Module loading", key);
    await loader();
  } catch (error) {
    console.error("Failed to load module", key, error);
  }
  return true;
}
