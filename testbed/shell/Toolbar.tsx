import React from "react";
import { tracked } from "./tracked";
import { Affix, Button, Group, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TbTools as ToolsIcon } from "react-icons/tb";
import { BiFolder as ModuleIcon } from "react-icons/bi";
import { BsPlayFill as PlayIcon } from "react-icons/bs";
import { BsPauseFill as PauseIcon } from "react-icons/bs";
import { BsChevronUp as PrevIcon } from "react-icons/bs";
import { BsChevronDown as NextIcon } from "react-icons/bs";
import { TbCode as CodeIcon } from "react-icons/tb";

import { toolbarTool, runtime, playlist, currentPlay } from "planck/testbed";

/** the url the playlist's links hang off: the site's root, and so the project's home */
declare const SHELL_URL: string;
import { CodeModal } from "./CodeModal";
import { PlaylistModal } from "./PlaylistMenu";
import { RenderingMenu } from "./RenderingMenu";
import { SimulationMenu } from "./SimulationMenu";

const affixStyle = {
  borderBottom: "1px solid #333",
  height: "46px",
  background: "#222",
};

// the outline is an Affix as well and renders after this one, so it would take the clicks along
// the toolbar's right end; one above puts the toolbar in front
const TOOLBAR_Z = 101;

const wordmarkStyle: React.CSSProperties = {
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--mantine-color-default-color)",
  textDecoration: "none",
  userSelect: "none",
};

const affixPosition = {
  top: 0,
  left: 0,
  right: 0,
};

export const ToolbarComponent: React.FC = tracked(() => {
  const context = runtime.value?.context;
  const [playlistOpened, { open: openPlaylist, close: closePlaylist }] = useDisclosure(false);
  const [codeOpened, { open: openCode, close: closeCode }] = useDisclosure(false);

  const handlePlay = React.useCallback(() => {
    if (!context) return;
    context.activity.value = "mode:play";
    context.paused.value = false;
    context.editable.value = false;
  }, [context]);

  const handlePause = React.useCallback(() => {
    if (!context) return;
    context.activity.value = "mode:play";
    context.paused.value = true;
    context.editable.value = false;
  }, [context]);

  // the playlist's order, stepped one at a time and wrapping at either end; each is a page of its
  // own, as the playlist's own links are
  const at = playlist.findIndex((play) => play.key === currentPlay.value?.key);
  const step = (by: number) => {
    const count = playlist.length;
    if (!count) return;
    const to = playlist[(Math.max(at, 0) + by + count) % count];
    if (to?.url) window.location.href = to.url;
  };

  return (
    <Affix style={affixStyle} position={affixPosition} p={10} zIndex={TOOLBAR_Z}>
      <Group gap={12}>
        <a href={`${SHELL_URL}/`} style={wordmarkStyle}>
          Planck.js
        </a>
        <Button.Group>
          <Button title="Playlist" variant="toolbar" onClick={openPlaylist}>
            <ModuleIcon />
          </Button>
          <Button title="Previous example" variant="toolbar" onClick={() => step(-1)}>
            <PrevIcon />
          </Button>
          <Button title="Next example" variant="toolbar" onClick={() => step(1)}>
            <NextIcon />
          </Button>
        </Button.Group>
        <PlaylistModal opened={playlistOpened} onClose={closePlaylist} />
        <Button title="Code" variant="toolbar" onClick={openCode}>
          <CodeIcon />
        </Button>
        <CodeModal opened={codeOpened} onClose={closeCode} />
        <Button
          onClick={handlePlay}
          variant="toolbar"
          disabled={context?.activity?.value === "mode:play" && !context?.paused?.value}
        >
          <PlayIcon />
        </Button>
        <Button
          onClick={handlePause}
          variant="toolbar"
          disabled={context?.activity?.value !== "mode:play" || context?.paused?.value}
        >
          <PauseIcon />
        </Button>
        <Menu position="bottom-start">
          <Menu.Target>
            <Button title="Tools" variant="toolbar">
              <ToolsIcon />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {toolbarTool.list.map((tool) => (
              <Menu.Item key={tool.name} onClick={() => tool.activate(context)}>
                {tool.name}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        <RenderingMenu />
        <SimulationMenu />
        <span>
          {context?.activity?.value ?? "∅"}
          &nbsp;&middot;&nbsp;
          {context?.paused?.value ? "paused" : "running"}
          &nbsp;&middot;&nbsp;
          {context?.activeTool?.value?.name ?? "∅"}
        </span>
      </Group>
    </Affix>
  );
});
