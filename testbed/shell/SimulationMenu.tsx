import React from "react";
import { Button, Menu, Slider, Stack, Text } from "@mantine/core";
import { MdTune as SimulationIcon } from "react-icons/md";

import { runtime } from "planck/testbed";

// simulation.hz may be stored either as a frequency (>= 1) or a period in
// seconds (< 1), see FrameLoop. Normalize to frequency for display.
function toHz(rawHz: number) {
  return Math.abs(rawHz) < 1 ? 1 / rawHz : rawHz;
}

function toNumber(value: number | string) {
  return typeof value === "number" ? value : parseFloat(value);
}

/** speed and step frequency, as a menu in the toolbar */
export const SimulationMenu: React.FC = () => {
  const context = runtime.value?.context;
  if (!context) return null;

  const handleSpeed = (value: number | string) => {
    const next = toNumber(value);
    if (Number.isFinite(next)) context.simulation.speed = next;
  };

  const handleHz = (value: number | string) => {
    const next = toNumber(value);
    if (Number.isFinite(next)) context.simulation.hz = next;
  };

  return (
    <Menu position="bottom-start" closeOnItemClick={false}>
      <Menu.Target>
        <Button title="Simulation" variant="toolbar">
          <SimulationIcon />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack gap="lg" p="xs" pb="lg" w={240}>
          <Stack gap={4}>
            <Text size="xs" fw={600}>
              Speed
            </Text>
            <Slider
              size="sm"
              mb="md"
              min={0}
              max={3}
              step={0.1}
              label={(value) => value.toFixed(1)}
              marks={[
                { value: 0, label: "0" },
                { value: 1, label: "1x" },
                { value: 2, label: "2x" },
                { value: 3, label: "3x" },
              ]}
              defaultValue={context.simulation.speed}
              onChange={handleSpeed}
            />
          </Stack>
          <Stack gap={4} mt="md">
            <Text size="xs" fw={600}>
              Hz
            </Text>
            <Slider
              size="sm"
              mb="md"
              min={15}
              max={240}
              step={1}
              label={(value) => value.toFixed(0)}
              marks={[
                { value: 30, label: "30" },
                { value: 60, label: "60" },
                { value: 120, label: "120" },
                { value: 240, label: "240" },
              ]}
              defaultValue={toHz(context.simulation.hz)}
              onChange={handleHz}
            />
          </Stack>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
};
