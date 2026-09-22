import React from "react";
import { Button, Checkbox, Menu, Stack, Text } from "@mantine/core";
import { MdOutlineVisibility as RenderingIcon } from "react-icons/md";

import { runtime, type RenderConfig } from "planck/testbed";

const FLAGS: { key: keyof RenderConfig; label: string; group: string }[] = [
  { key: "shapes", label: "Shapes", group: "Rendering" },
  { key: "bounds", label: "Bounds", group: "Rendering" },
  { key: "mass", label: "Mass", group: "Rendering" },
  { key: "bodyNames", label: "Body Names", group: "Rendering" },
  { key: "joints", label: "Joints", group: "Joints" },
  { key: "contact", label: "Contact Points", group: "Contacts" },
  { key: "contactNormals", label: "Contact Normals", group: "Contacts" },
];

/** the debug-draw flags, as a menu in the toolbar */
export const RenderingMenu: React.FC = () => {
  const context = runtime.value?.context;
  if (!context) return null;

  const renderConfig = context.renderConfig.value;
  const setRenderConfig = (patch: Partial<RenderConfig>) => {
    context.renderConfig.value = { ...renderConfig, ...patch };
  };

  let group = "";
  return (
    <Menu position="bottom-start" closeOnItemClick={false}>
      <Menu.Target>
        <Button title="Rendering" variant="toolbar">
          <RenderingIcon />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack gap="xs" p="xs">
          {FLAGS.map((flag) => {
            const heading = flag.group !== group ? flag.group : null;
            group = flag.group;
            return (
              <React.Fragment key={flag.key}>
                {heading && (
                  <Text size="xs" fw={600} mt={heading === "Rendering" ? 0 : "xs"}>
                    {heading}
                  </Text>
                )}
                <Checkbox
                  size="xs"
                  label={flag.label}
                  checked={!!renderConfig[flag.key]}
                  onChange={(e) => setRenderConfig({ [flag.key]: e.currentTarget.checked })}
                />
              </React.Fragment>
            );
          })}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
};
