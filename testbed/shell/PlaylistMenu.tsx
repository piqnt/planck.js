import React from "react";
import { tracked } from "./tracked";
import { Modal, ScrollArea, NavLink, SimpleGrid, UnstyledButton, Group, Stack, Text } from "@mantine/core";

import { PlayConfig, playlist, currentPlay } from "planck/testbed";

export interface PlaylistFolder {
  label: string;
  files: PlaylistFile[];
}

export interface PlaylistFile {
  label: string;
  play: PlayConfig;
}

/** the folder a play's key names, "" for a key that has none */
function folderOf(key: string): string {
  const slash = key.lastIndexOf("/");
  return slash === -1 ? "" : key.slice(0, slash);
}

export function buildPlaylistFolders(playlist: PlayConfig[]): PlaylistFolder[] {
  const folders = new Map<string, PlaylistFolder>();
  for (const play of playlist) {
    // keys with no folder (this repo's examples) share one unnamed group
    const folderName = folderOf(play.key);
    const label = folderName ? play.key.slice(folderName.length + 1) : play.key;
    if (!folders.has(folderName)) {
      folders.set(folderName, { label: folderName, files: [] });
    }
    folders.get(folderName)!.files.push({ label, play });
  }
  return Array.from(folders.values());
}

interface PlaylistModalProps {
  opened: boolean;
  onClose: () => void;
}

export const PlaylistModal: React.FC<PlaylistModalProps> = tracked(({ opened, onClose }) => {
  const folders = React.useMemo(() => buildPlaylistFolders(playlist), []);
  const [activeFolder, setActiveFolder] = React.useState(() => folders[0]?.label);

  React.useEffect(() => {
    if (!opened) return;
    const folderName = currentPlay.value && folderOf(currentPlay.value.key);
    if (folderName) setActiveFolder(folderName);
  }, [opened]);

  const handleSelect = React.useCallback(
    (url: string) => {
      if (!url) return;
      onClose();
      window.location.href = url;
    },
    [onClose],
  );

  const currentFolder = folders.find((folder) => folder.label === activeFolder) ?? folders[0];
  // nothing to choose between when the plays are not in folders
  const showFolders = folders.length > 1 || !!folders[0]?.label;

  return (
    <Modal opened={opened} onClose={onClose} title="Playlist" size="xl">
      <Group align="stretch" gap={0} wrap="nowrap">
        {showFolders && (
          <ScrollArea flex="0 0 160px" style={{ borderRight: "1px solid var(--mantine-color-default-border)" }}>
            <Stack gap={2}>
              {folders.map((folder) => (
                <NavLink
                  key={folder.label}
                  label={folder.label}
                  active={folder.label === currentFolder?.label}
                  onClick={() => setActiveFolder(folder.label)}
                />
              ))}
            </Stack>
          </ScrollArea>
        )}
        <ScrollArea flex={1}>
          <SimpleGrid cols={3} spacing="xs" p="sm">
            {currentFolder?.files.map((file) => (
              <UnstyledButton
                key={file.play.key}
                onClick={() => handleSelect(file.play.url)}
                bg={file.play.key === currentPlay.value?.key ? "var(--mantine-color-default-hover)" : undefined}
                p="sm"
              >
                <Text size="sm" truncate>
                  {file.label}
                </Text>
              </UnstyledButton>
            ))}
          </SimpleGrid>
        </ScrollArea>
      </Group>
    </Modal>
  );
});
