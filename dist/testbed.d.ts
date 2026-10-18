import { Middleware } from 'polymatic';
import { Vec2Value, AABBValue, World, Body, Joint, Fixture } from 'planck';
export { Testbed } from 'planck';

/**
 * What a host decides before it runs a project's code: the page it is making, not the commands
 * it sends later. A host writes these while loading, and `initTestbedContext` reads them once,
 * when the testbed mounts — so the project's own `testbed.zoomPan = …`, running afterwards,
 * always wins, with no second writer to race.
 *
 * Changing them after the testbed has mounted does nothing: a host drives a running testbed
 * through its context instead (see `runtime` in api.ts).
 */
interface TestbedDefaults {
    /** zoom with the wheel or a pinch, pan by dragging empty space; off, so an embedded testbed leaves the wheel to the page */
    zoomPan: boolean;
    /** pause after 15 seconds without user input */
    autoPause: boolean;
    /** the view's background color */
    background: string;
    /** show the outline, where a shell renders one */
    showOutline: boolean;
    /** show the toolbar, where a shell renders one */
    showToolbar: boolean;
}

interface Style {
    stroke?: string;
    fill?: string;
    lineWidth?: number;
}
type StepEvent = {
    /** seconds */
    timeStep: number;
    velocityIterations: number;
    positionIterations: number;
};
type StepCallback = (ev: StepEvent) => void;
type FrameCallback = () => void;
type KeyupCallback = (ev: KeyboardEvent) => void;
type KeydownCallback = (ev: KeyboardEvent) => void;
/** `left`, `right`, `up`, `down`, `fire` (space or enter), and letters and digits by character */
type ActiveKeys = Record<string, boolean>;
/**
 * What a scenario script gets from `Testbed.mount()`: planck's TestbedInterface (src/util/Testbed)
 * plus the frame and step events.
 */
interface TestbedInterface {
    /** World viewbox width. */
    width: number;
    /** World viewbox height. */
    height: number;
    /** World viewbox center vertical offset. */
    x: number;
    /** World viewbox center horizontal offset. */
    y: number;
    /** @hidden */
    scaleY: number;
    /** World simulation step frequency */
    hz: number;
    /** World simulation speed, default is 1 */
    speed: number;
    background: string;
    mouseForce?: number;
    /** Zoom with the wheel or a pinch, pan by dragging empty space. */
    zoomPan?: boolean;
    /** Pause after 15 seconds without user input. Off by default. */
    autoPause?: boolean;
    activeKeys: ActiveKeys;
    /** callback, to be implemented by user */
    step?: (dt: number, t: number) => void;
    /** callback, to be implemented by user */
    keydown?: (keyCode: number, label: string) => void;
    /** callback, to be implemented by user */
    keyup?: (keyCode: number, label: string) => void;
    status(name: string, value: any): void;
    status(value: object | string): void;
    info(text: string): void;
    color(r: number, g: number, b: number): string;
    drawPoint(p: Vec2Value, r: any, color: string): void;
    drawCircle(p: Vec2Value, r: number, color: string): void;
    drawCapsule(a: Vec2Value, b: Vec2Value, r: number, color: string): void;
    drawEdge(a: Vec2Value, b: Vec2Value, color: string): void;
    drawSegment(a: Vec2Value, b: Vec2Value, color: string): void;
    drawPolygon(points: Array<Vec2Value>, color: string): void;
    drawChain(points: Array<Vec2Value>, color: string): void;
    drawAABB(aabb: AABBValue, color: string): void;
    start(world: World): void;
    /** The world the testbed steps and draws; `start(world)` sets it too. */
    world: World;
    isPaused(): boolean;
    pause(): void;
    resume(): void;
    findOne(query: string): Body | Joint | Fixture | null;
    findAll(query: string): (Body | Joint | Fixture)[];
    on(name: "step-before", listener: StepCallback): void;
    on(name: "step-after", listener: StepCallback): void;
    on(name: "frame-update", listener: FrameCallback): void;
    on(name: "frame-render", listener: FrameCallback): void;
    on(name: "keydown", listener: KeyupCallback): void;
    on(name: "keyup", listener: KeydownCallback): void;
}

/** a value a host reads and sets; the testbed's own signal underneath */
interface HostValue<T> {
    value: T;
}
/** The parts of the mounted testbed's state a host such as piqnt drives. */
interface HostContext {
    activity: HostValue<string>;
    paused: HostValue<boolean>;
    showOutline: HostValue<boolean>;
    showToolbar: HostValue<boolean>;
    simulation: {
        speed: number;
    };
}
/**
 * For hosts: the mounted testbed, undefined until it mounts. Read and set it through `.value`,
 * and watch for the mount with `.subscribe()`. Its signals are the testbed's own copy of
 * @preact/signals-core, bundled in this module, so a host's own `effect()` does not track them.
 */
interface TestbedRuntime {
    readonly value: {
        context: HostContext;
    } | undefined;
    subscribe(listener: (value: {
        context: HostContext;
    } | undefined) => void): () => void;
}
/**
 * For games: the testbed's own state, as a game's middleware sees it beside its own. The context
 * carries more; these are the parts a game is meant to read and set.
 */
interface TestbedContext {
    /** the world the testbed draws and steps; a game sets its own */
    world: HostValue<World>;
    /** the view, in world units */
    camera: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /** the force the pointer applies; negative is an impulse on release */
    mouseForce: HostValue<number>;
    /** "interact-pull", "interact-impulse", "inspect", or a tool a game registers */
    activeTool: HostValue<{
        name: string;
    }>;
    /** left/right/up/down (arrows or WASD), fire (space or enter), and characters */
    activeKeys: ActiveKeys;
}
/**
 * For games: the testbed as a middleware, to `use()` inside a stack of your own. Activate that
 * stack yourself with polymatic's `Runtime.activate(main, context)`; the testbed registers
 * itself as it activates, so the shell and a host find it.
 *
 * `emit("tool-switch", { name, mouseForce })` picks what the pointer does: "interact-pull",
 * "interact-impulse" (a negative mouseForce throws on release) or "inspect".
 */
declare const TestbedMain: new () => Middleware<TestbedContext>;
/** For games: the testbed's context, with your own state on it. */
declare const initTestbedContext: <C extends object>(state?: C) => TestbedContext & C;
/**
 * For hosts: what to decide before running a project's code — the page you are making, read
 * once when the testbed mounts. The project's own settings run afterwards and win. To drive a
 * testbed that is already running, use `runtime` instead.
 */
declare const testbedDefaults: Partial<TestbedDefaults>;

/** For hosts: mounts the testbed once, as Testbed.mount() does, and returns it. */
declare const mountTestbed: () => TestbedInterface;
/** For hosts: see TestbedRuntime. */
declare const runtime: TestbedRuntime;

export { TestbedMain, initTestbedContext, mountTestbed, runtime, testbedDefaults };
export type { ActiveKeys, FrameCallback, HostContext, HostValue, KeydownCallback, KeyupCallback, StepCallback, StepEvent, Style, TestbedContext, TestbedDefaults, TestbedInterface, TestbedRuntime };
