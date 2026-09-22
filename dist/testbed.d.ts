import { Signal } from '@preact/signals';
import { Middleware } from 'polymatic';
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
    findOne(query: string): Body | Joint | Fixture | null;
    findAll(query: string): (Body | Joint | Fixture)[];
    on(name: "step-before", listener: StepCallback): void;
    on(name: "step-after", listener: StepCallback): void;
    on(name: "frame-update", listener: FrameCallback): void;
    on(name: "frame-render", listener: FrameCallback): void;
    on(name: "keydown", listener: KeyupCallback): void;
    on(name: "keyup", listener: KeydownCallback): void;
}

interface ToolConfig {
    name: string;
    [prop: string]: unknown;
}

interface ConsoleInterface {
    info(text: string): void;
    status(name: string, value: any): void;
    status(value: object | string): void;
}

interface WorldQueryMatch {
    worldBody: Body;
    worldFixture: Fixture;
    /** their keys (see WorldKeys), what the selection and the outline hold */
    body: string;
    fixture: string;
}
interface WorldQueryContext {
    world: Signal<World>;
    pointerRadius?: number;
    worldQuery: WorldQuery;
}
/** what is under a point (the nearest fixture within the pointer's radius) or inside a box */
declare class WorldQuery extends Middleware<WorldQueryContext> {
    constructor();
    handleActivate: () => void;
    testPoint: (point: Vec2Value, filter?: (match: WorldQueryMatch) => boolean) => WorldQueryMatch | undefined;
    testBox: (start: Vec2Value, end: Vec2Value, filter?: (match: WorldQueryMatch) => boolean) => WorldQueryMatch[];
}

/**
 * A 2D affine matrix, plain data in the DOM's layout: `x' = a x + c y + e`,
 * `y' = b x + d y + f`. The functions write into an `out` (planck 2's
 * convention), nothing allocates.
 */
interface Mat2d {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}

interface ShapeProgram {
    program: WebGLProgram;
    uProjectionMatrix: WebGLUniformLocation;
    uPixelScale: WebGLUniformLocation;
}
interface LineProgram {
    program: WebGLProgram;
    uProjectionMatrix: WebGLUniformLocation;
}
interface PolygonProgram extends ShapeProgram {
    uVertexTex: WebGLUniformLocation;
    uVertexTexWidth: WebGLUniformLocation;
}
interface GLResources {
    gl: WebGL2RenderingContext;
    quadBuffer: WebGLBuffer;
    circleProgram: ShapeProgram;
    capsuleProgram: ShapeProgram;
    polygonProgram: PolygonProgram;
    lineProgram: LineProgram;
    projectionMatrix: Float32Array;
    pixelScale: number;
}

interface Target {
    key: string;
    type: string;
    /** what it belongs to: a fixture's body */
    up?: Target;
}
/**
 * What is selected: one body, fixture or joint (the testbed inspects one
 * thing at a time). A list, for compatibility with readers of `selected`.
 */
declare class Multiselect {
    /** do not mutate */
    readonly selected: Target[];
    constructor(selected?: Target[]);
}
declare function isSelected(selection: Multiselect | undefined, key: string): boolean;
interface SelectionContext {
    multiselect: Signal<Multiselect>;
}
declare function setSelection(context: SelectionContext, selection: Target | null): void;
declare function emptySelection(context: SelectionContext): void;
/** clears the selection if it is this target */
declare function removeSelection(context: SelectionContext, selection: Target): void;
declare function selectBody(body: string): Target;
declare function selectFixture(fixture: string, body: string): Target;
declare function selectJoint(joint: string): Target;

declare function initTestbedContext(): TestbedContext;
interface ContextSimulation {
    speed: number;
    /** steps per second */
    hz: number;
    velocityIterations: number;
    positionIterations: number;
}
/** what the debug draw shows */
interface RenderConfig {
    shapes: boolean;
    bounds: boolean;
    mass: boolean;
    bodyNames: boolean;
    joints: boolean;
    contact: boolean;
    contactNormals: boolean;
}
interface TestbedContext {
    activity: Signal<string>;
    activeTool: Signal<ToolConfig>;
    paused: Signal<boolean>;
    editable: Signal<boolean>;
    pointerCaptured: boolean;
    style: {
        background?: string;
    };
    camera: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    mouseForce: Signal<number>;
    containerElement: Signal<HTMLElement>;
    canvasElement: Signal<HTMLCanvasElement>;
    gl: Signal<GLResources>;
    worldMatrix: Mat2d;
    pixelPerUnit?: number;
    pointerRadius?: number;
    showOutline: Signal<boolean>;
    showToolbar: Signal<boolean>;
    activeKeys: ActiveKeys;
    /** what the outline and the inspect tool selected, by key */
    multiselect: Signal<Multiselect>;
    console: ConsoleInterface;
    worldQuery?: WorldQuery;
    world: Signal<World>;
    simulation: ContextSimulation;
    renderConfig: Signal<RenderConfig>;
    textOverlay: Signal<CanvasRenderingContext2D>;
}

declare class ProviderCollection<P> {
    list: P[];
    register(provider: P): void;
}
interface ToolbarTool {
    name: string;
    activate: (context: any) => void;
}
interface PlayConfig {
    path: string;
    key: string;
    url: string;
}
declare const playlist: PlayConfig[];
declare const currentPlay: Signal<PlayConfig>;
declare const toolbarTool: ProviderCollection<ToolbarTool>;
/** the running stack: TestbedMain from Testbed.mount(), or a game's own middleware that uses it */
interface RuntimeRef {
    middleware: Middleware<TestbedContext>;
    context: TestbedContext;
    emit: (type: string, ev?: any) => void;
}
declare const runtime: Signal<RuntimeRef>;

declare const generateKey: (size?: number) => string;
declare function getKey(this: unknown, obj: object): string | undefined;
/**
 * If key is provided always assign it.
 * If key is not provided, and object doesn't have a key generate and assign new key.
 */
declare function setKey(this: unknown, obj: object, key?: string): string | undefined;
/**
 * Recursively replace objects with their key.
 */
declare function replaceKey(this: unknown, node: any): any;

declare const getLabel: (obj: any) => any;
declare const setLabel: (obj: any, id: string) => void;

type LookupResult = Body | Fixture | Joint;
declare const findOne: (world: World, query: string) => LookupResult | null;
declare const findAll: (world: World, query: string) => LookupResult[];

declare function findBody(world: World, key: string): Body | undefined;
declare function findFixture(world: World, key: string): Fixture | undefined;
declare function findJoint(world: World, key: string): Joint | undefined;

/** Testbed with preset middleware */
declare class TestbedMain extends Middleware<TestbedContext> implements TestbedInterface {
    private draw;
    constructor();
    /** callback, to be implemented by user */
    step?: (dt: number, t: number) => void;
    /** callback, to be implemented by user */
    keydown?: (keyCode: number, label: string) => void;
    /** callback, to be implemented by user */
    keyup?: (keyCode: number, label: string) => void;
    private handleFrameUpdate;
    private handleKeydown;
    private handleKeyup;
    color(r: number, g: number, b: number): string;
    findOne(query: string): Body | Joint | Fixture | null;
    findAll(query: string): (Body | Joint | Fixture)[];
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get background(): string;
    set background(value: string);
    scaleY: number;
    get hz(): number;
    set hz(value: number);
    get speed(): number;
    set speed(value: number);
    get mouseForce(): number;
    set mouseForce(value: number);
    get activeKeys(): ActiveKeys;
    start(world: World): void;
    get world(): World;
    set world(world: World);
    drawPoint(p: Vec2Value, r: number, color: string): void;
    drawCircle(p: Vec2Value, r: number, color: string): void;
    drawCapsule(a: Vec2Value, b: Vec2Value, r: number, color: string): void;
    drawEdge(a: Vec2Value, b: Vec2Value, color: string): void;
    drawSegment(a: Vec2Value, b: Vec2Value, color: string): void;
    drawPolygon(points: Array<Vec2Value>, color: string): void;
    drawChain(points: Array<Vec2Value>, color: string): void;
    drawAABB(aabb: AABBValue, color: string): void;
    isPaused(): boolean;
    pause(): void;
    resume(): void;
    info(text: string): void;
    status(name: string, value: any): void;
    status(value: object | string): void;
}

/**
 * Mounts the testbed. `Testbed.mount()` and `Testbed.start(world)` on planck's own Testbed class
 * do this once `planck/testbed` is loaded.
 */
declare const mountTestbed: () => TestbedMain;

interface DrawWorldContext {
    world: Signal<World>;
    renderConfig: Signal<RenderConfig>;
    gl: Signal<GLResources>;
}
declare class DrawWorld extends Middleware<DrawWorldContext> {
    private draw;
    constructor();
    handleFrameRender: () => void;
    private drawBody;
}

interface DrawBoundsContext {
    world: Signal<World>;
    renderConfig: Signal<RenderConfig>;
    gl: Signal<GLResources>;
}
/** the fixtures' fat AABBs, the ones in the broad-phase */
declare class DrawBounds extends Middleware<DrawBoundsContext> {
    private draw;
    constructor();
    handleFrameRender: () => void;
}

interface DrawBodyInfoContext {
    world: Signal<World>;
    renderConfig: Signal<RenderConfig>;
    gl: Signal<GLResources>;
    textOverlay: Signal<CanvasRenderingContext2D>;
    worldMatrix: Mat2d;
}
/** the bodies' labels (`lookupId`, what findOne looks up) and their mass, when asked for */
declare class DrawBodyInfo extends Middleware<DrawBodyInfoContext> {
    private draw;
    constructor();
    handleFrameRender: () => void;
    private drawBodyName;
    private drawMass;
}

interface DrawJointsContext {
    world: Signal<World>;
    renderConfig: Signal<RenderConfig>;
    gl: Signal<GLResources>;
}
declare class DrawJoints extends Middleware<DrawJointsContext> {
    private draw;
    constructor();
    handleFrameRender: () => void;
    private drawJoint;
}
declare const rotate: (q: {
    c: number;
    s: number;
}, v: Vec2Value) => Vec2Value;

/** the touching contacts' manifold points, and their normals */
declare class DrawContacts extends Middleware<TestbedContext> {
    private draw;
    private manifold;
    constructor();
    handleFrameRender: () => void;
}

interface WorldStepContext {
    world: Signal<World>;
    paused: Signal<boolean>;
}
/**
 * Steps the world on each fixed tick ("step-physics" event) emitted by FrameLoop.
 */
declare class WorldStep extends Middleware<WorldStepContext> {
    constructor();
    handleStep: (ev: StepEvent) => void;
}

interface WorldKeysContext {
    world: Signal<World>;
}
/**
 * Every body, fixture and joint of the world gets a key, if it has none: the outline and the
 * selection refer to them by key.
 */
declare class WorldKeys extends Middleware<WorldKeysContext> {
    private dispose;
    constructor();
    handleActivate: () => void;
    handleDeactivate: () => void;
    keyOne: (obj: Body | Fixture | Joint) => void;
}

interface LocalPointerUp {
    raw: PointerEvent;
    point: {
        x: number;
        y: number;
    };
}

interface InspectToolContext {
    multiselect: Signal<Multiselect>;
    worldQuery: WorldQuery;
}
/**
 * Click to select a body; click it again for the fixture under the pointer,
 * or another fixture of the same body. A click on the background steps back
 * up: from a fixture to its body, from a body to nothing.
 */
declare class InspectTool extends Middleware<InspectToolContext> {
    constructor();
    handleClick: (ev: LocalPointerUp) => void;
}

interface SelectionManagerContext {
    multiselect: Signal<Multiselect>;
}
/** the selection as the outline asks for it: select-body, select-fixture, select-joint, deselect-* */
declare class SelectionManager extends Middleware<SelectionManagerContext> {
    constructor();
    selectBody: (select: {
        body: string;
    }) => void;
    deselectBody: (select: {
        body: string;
    }) => void;
    selectFixture: (select: {
        fixture: string;
        body: string;
    }) => void;
    deselectFixture: (select: {
        fixture: string;
        body: string;
    }) => void;
    selectJoint: (select: {
        joint: string;
    }) => void;
    deselectJoint: (select: {
        joint: string;
    }) => void;
    deselectAll: () => void;
}

interface TextOverlayLoaderContext {
    containerElement: Signal<HTMLElement>;
    textOverlay: Signal<CanvasRenderingContext2D>;
}
interface DrawTextContext {
    worldMatrix: Mat2d;
    textOverlay: Signal<CanvasRenderingContext2D>;
}
declare class TextOverlay extends Middleware<TextOverlayLoaderContext> {
    private disposers;
    private canvas;
    private resizeObserver;
    constructor();
    handleActivate: () => void;
    handleDeactivate: () => void;
    handleResize: () => void;
    handleFrameBefore: () => void;
}
declare function drawWorldString(context: DrawTextContext, p: Vec2Value, text: string, color: string, align?: CanvasTextAlign): void;

export { DrawBodyInfo, DrawBounds, DrawContacts, DrawJoints, DrawWorld, InspectTool, Multiselect, ProviderCollection, SelectionManager, TestbedMain, TextOverlay, WorldKeys, WorldQuery, WorldStep, currentPlay, drawWorldString, emptySelection, findAll, findBody, findFixture, findJoint, findOne, generateKey, getKey, getLabel, initTestbedContext, isSelected, mountTestbed, playlist, removeSelection, replaceKey, rotate, runtime, selectBody, selectFixture, selectJoint, setKey, setLabel, setSelection, toolbarTool };
export type { ActiveKeys, ContextSimulation, DrawTextContext, FrameCallback, KeydownCallback, KeyupCallback, PlayConfig, RenderConfig, RuntimeRef, StepCallback, StepEvent, Style, Target, TestbedContext, TestbedInterface, ToolbarTool, WorldQueryMatch };
