import React from "react";
import { Anchor, Group, Modal, ScrollArea } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { BsGithub as GithubIcon } from "react-icons/bs";

import { currentPlay } from "planck/testbed";
import { loadSource } from "./Playlist";

/** where an example's file lives, for the link beside its code */
const SOURCE_BASE = "https://github.com/piqnt/planck.js/blob/master/example";

interface CodeModalProps {
  opened: boolean;
  onClose: () => void;
}

/** The source of the example on screen, as registered by findSources. */
export const CodeModal: React.FC<CodeModalProps> = ({ opened, onClose }) => {
  const play = currentPlay.value;
  const key = play?.key;
  const [source, setSource] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!opened || !key) return;
    let current = true;
    setSource(null);
    loadSource(key).then((text) => current && setSource(text));
    return () => {
      current = false;
    };
  }, [opened, key]);

  const file = play?.path?.replace(/^\.\//, "") ?? (key && `${key}.ts`);

  return (
    // the body scrolls, not the page: a file is far taller than the modal, and without this it
    // is clipped at the modal's edge with no way to reach the rest
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      title={<Title file={file} />}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <CodeHighlight
        code={source ?? (source === null ? "…" : "no source for this example")}
        language="typescript"
        withCopyButton={!!source}
      />
    </Modal>
  );
};

const Title: React.FC<{ file?: string }> = ({ file }) =>
  file ? (
    <Anchor
      href={`${SOURCE_BASE}/${file}`}
      target="_blank"
      rel="noreferrer"
      c="inherit"
      underline="hover"
      title="View on GitHub"
    >
      <Group gap={8} wrap="nowrap">
        <GithubIcon />
        <span>{file}</span>
      </Group>
    </Anchor>
  ) : null;
