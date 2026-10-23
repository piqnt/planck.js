import type React from "react";
import { useSignals } from "@preact/signals-react/runtime";

/**
 * A function component that re-renders when a signal it read while rendering changes, on React
 * and on preact/compat alike.
 *
 * The signals effect is closed when the render returns (the managed form, as signals-react's
 * Babel transform writes it), not left open until the next component: a Preact page that also
 * loads @preact/signals tracks each render in an effect of its own, and an effect left open
 * across components ends out of order ("Out-of-order effect").
 */
export function tracked<P>(render: (props: P) => React.ReactNode): React.FC<P> {
  return function Tracked(props: P) {
    const store = useSignals(1);
    try {
      return render(props);
    } finally {
      store.f();
    }
  };
}
