import React from "react";
import { Affix, Button, Group, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TbTools as ToolsIcon } from "react-icons/tb";
import { BiFolder as ModuleIcon } from "react-icons/bi";
import { BsPlayFill as PlayIcon } from "react-icons/bs";
import { BsPauseFill as PauseIcon } from "react-icons/bs";

import { toolbarTool, runtime } from "planck/testbed";
import { PlaylistModal } from "./PlaylistMenu";
import { RenderingMenu } from "./RenderingMenu";
import { SimulationMenu } from "./SimulationMenu";

const affixStyle = {
  borderBottom: "1px solid #333",
  height: "46px",
  background: "#222",
};

const affixPosition = {
  top: 0,
  left: 0,
  right: 0,
};

export const ToolbarComponent: React.FC = () => {
  const context = runtime.value?.context;
  const [playlistOpened, { open: openPlaylist, close: closePlaylist }] = useDisclosure(false);

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

  return (
    <Affix style={affixStyle} position={affixPosition} p={10}>
      <Group gap={12}>
        <Button title="Playlist" variant="toolbar" onClick={openPlaylist}>
          <ModuleIcon />
        </Button>
        <PlaylistModal opened={playlistOpened} onClose={closePlaylist} />
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
};
