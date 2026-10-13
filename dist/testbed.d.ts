import { Vec2Value, AABBValue, World, Body, Joint, Fixture } from 'planck';
export { Testbed } from 'planck';

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
/** For hosts: mounts the testbed once, as Testbed.mount() does, and returns it. */
declare const mountTestbed: () => TestbedInterface;
/** For hosts: see TestbedRuntime. */
declare const runtime: TestbedRuntime;

export { mountTestbed, runtime };
export type { ActiveKeys, FrameCallback, HostContext, HostValue, KeydownCallback, KeyupCallback, StepCallback, StepEvent, Style, TestbedInterface, TestbedRuntime };
