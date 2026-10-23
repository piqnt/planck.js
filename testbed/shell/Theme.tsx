import { ButtonProps, createTheme, MantineTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "gray",
  components: {
    // Mantine gives an Affix and a Modal the same z-index, so the toolbar and the
    // outline covered the playlist. The chrome sits below every overlay.
    Affix: {
      defaultProps: {
        zIndex: 100,
      },
    },
    Button: {
      vars: (theme: MantineTheme, props: ButtonProps) => {
        if (props.variant === "toolbar") {
          return {
            root: {
              "--button-height": "var(--button-height-compact-sm)",
              "--button-padding-x": "var(--button-padding-x-compact-sm)",
              "--button-fz": "var(--mantine-font-size-sm)",
              "--button-bg": "var(--mantine-color-default)",
              "--button-hover": "var(--mantine-color-default-hover)",
              "--button-color": "var(--mantine-color-default-color)",
              "--button-bd": "calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-default-border)",
              fontWeight: "400",
            },
          };
        }
        return {};
      },
    },
  },
});
