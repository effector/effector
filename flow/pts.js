//@flow

declare export function namespace(scope: any): void
declare export function quickStart(
  id: string,
  bg?: string,
): (animate?: any, start?: any, action?: any, resize?: any) => void
declare export class Form {
  +ready: boolean;
  static _checkSize(pts: GroupLike | number[][], required?: number): boolean;
}
declare export class VisualForm extends Form {
  filled: boolean;

  stroked: boolean;

  +currentFont: Font;

  reset(): this;
  fill(c: string | boolean): this;
  fillOnly(c: string | boolean): this;
  stroke(
    c: string | boolean,
    width?: number,
    linejoin?: string,
    linecap?: string,
  ): this;
  strokeOnly(
    c: string | boolean,
    width?: number,
    linejoin?: string,
    linecap?: string,
  ): this;
  point(p: PtLike, radius: number, shape: string): this;
  points(pts: GroupLike | number[][], radius: number, shape: string): this;
  circle(pts: GroupLike | number[][]): this;
  circles(groups: GroupLike[]): this;
  squares(groups: GroupLike[]): this;
  arc(
    pt: PtLike,
    radius: number,
    startAngle: number,
    endAngle: number,
    cc?: boolean,
  ): this;
  line(pts: GroupLike | number[][]): this;
  lines(groups: GroupLike[]): this;
  polygon(pts: GroupLike | number[][]): this;
  polygons(groups: GroupLike[]): this;
  rect(pts: number[][] | Pt[]): this;
  rects(groups: GroupLike[]): this;
  text(pt: PtLike, txt: string, maxWidth?: number): this;
  font(
    sizeOrFont: number | Font,
    weight?: string,
    style?: string,
    lineHeight?: number,
    family?: string,
  ): this;
}
declare export class Font {
  size: number;
  lineHeight: number;
  face: string;
  style: string;
  weight: string;
  constructor(
    size?: number,
    face?: string,
    weight?: string,
    style?: string,
    lineHeight?: number,
  ): Font;
  +value: string;
  toString(): string;
}

declare export class Vec {
  static add(a: PtLike, b: PtLike | number): PtLike;
  static subtract(a: PtLike, b: PtLike | number): PtLike;
  static multiply(a: PtLike, b: PtLike | number): PtLike;
  static divide(a: PtLike, b: PtLike | number): PtLike;
  static dot(a: PtLike, b: PtLike): number;
  static cross2D(a: PtLike, b: PtLike): number;
  static cross(a: PtLike, b: PtLike): Pt;
  static magnitude(a: PtLike): number;
  static unit(a: PtLike, magnitude?: number): PtLike;
  static abs(a: PtLike): PtLike;
  static floor(a: PtLike): PtLike;
  static ceil(a: PtLike): PtLike;
  static round(a: PtLike): PtLike;
  static max(
    a: PtLike,
  ): {
    value: any,
    index: any,
  };
  static min(
    a: PtLike,
  ): {
    value: any,
    index: any,
  };
  static sum(a: PtLike): number;
  static map(
    a: PtLike,
    fn: (n: number, index: number, arr: any) => number,
  ): PtLike;
}
declare export class Mat {
  static add(a: GroupLike, b: GroupLike | number[][] | number): Group;
  static multiply(
    a: GroupLike,
    b: GroupLike | number[][] | number,
    transposed?: boolean,
    elementwise?: boolean,
  ): Group;
  static zipSlice(
    g: GroupLike | number[][],
    index: number,
    defaultValue?: number | boolean,
  ): Pt;
  static zip(
    g: GroupLike | number[][],
    defaultValue?: number | boolean,
    useLongest?: boolean,
  ): Group;
  static transpose(
    g: GroupLike | number[][],
    defaultValue?: number | boolean,
    useLongest?: boolean,
  ): Group;
  static transform2D(pt: PtLike, m: GroupLike | number[][]): Pt;
  static scale2DMatrix(x: number, y: number): GroupLike;
  static rotate2DMatrix(cosA: number, sinA: number): GroupLike;
  static shear2DMatrix(tanX: number, tanY: number): GroupLike;
  static translate2DMatrix(x: number, y: number): GroupLike;
  static scaleAt2DMatrix(sx: number, sy: number, at: PtLike): GroupLike;
  static rotateAt2DMatrix(cosA: number, sinA: number, at: PtLike): GroupLike;
  static shearAt2DMatrix(tanX: number, tanY: number, at: PtLike): GroupLike;
  static reflectAt2DMatrix(p1: PtLike, p2: PtLike): Pt[];
}

declare export class Num {
  static equals(a: number, b: number, threshold?: number): boolean;
  static lerp(a: number, b: number, t: number): number;
  static clamp(val: number, min: number, max: number): number;
  static boundValue(val: number, min: number, max: number): number;
  static within(p: number, a: number, b: number): boolean;
  static randomRange(a: number, b?: number): number;
  static normalizeValue(n: number, a: number, b: number): number;
  static sum(pts: GroupLike | number[][]): Pt;
  static average(pts: GroupLike | number[][]): Pt;
  static cycle(t: number): number;
  static mapToRange(
    n: number,
    currA: number,
    currB: number,
    targetA: number,
    targetB: number,
  ): number;
}
declare export class Geom {
  static boundAngle(angle: number): number;
  static boundRadian(radian: number): number;
  static toRadian(angle: number): number;
  static toDegree(radian: number): number;
  static boundingBox(pts: GroupLike): Group;
  static centroid(pts: GroupLike | number[][]): Pt;
  static anchor(
    pts: GroupLike,
    ptOrIndex?: PtLike | number,
    direction?: 'to' | 'from',
  ): void;
  static interpolate(a: Pt | number[], b: Pt | number[], t?: number): Pt;
  static perpendicular(pt: PtLike, axis?: string | number[]): Group;
  static isPerpendicular(p1: PtLike, p2: PtLike): boolean;
  static withinBound(
    pt: PtLike | number[],
    boundPt1: PtLike | number[],
    boundPt2: PtLike | number[],
  ): boolean;
  static sortEdges(pts: GroupLike): GroupLike;
  static scale(
    ps: Pt | GroupLike,
    scale: number | number[] | PtLike,
    anchor?: PtLike,
  ): Geom;
  static rotate2D(
    ps: Pt | GroupLike,
    angle: number,
    anchor?: PtLike,
    axis?: string,
  ): Geom;
  static shear2D(
    ps: Pt | GroupLike,
    scale: number | number[] | PtLike,
    anchor?: PtLike,
    axis?: string,
  ): Geom;
  static reflect2D(ps: Pt | GroupLike, line: GroupLike, axis?: string): Geom;
  static cosTable(): {
    table: Float64Array,
    cos: (rad: number) => number,
  };
  static sinTable(): {
    table: Float64Array,
    sin: (rad: number) => number,
  };
}
declare export class Shaping {
  static linear(t: number, c?: number): number;
  static quadraticIn(t: number, c?: number): number;
  static quadraticOut(t: number, c?: number): number;
  static quadraticInOut(t: number, c?: number): number;
  static cubicIn(t: number, c?: number): number;
  static cubicOut(t: number, c?: number): number;
  static cubicInOut(t: number, c?: number): number;
  static exponentialIn(t: number, c?: number, p?: number): number;
  static exponentialOut(t: number, c?: number, p?: number): number;
  static sineIn(t: number, c?: number): number;
  static sineOut(t: number, c?: number): number;
  static sineInOut(t: number, c?: number): number;
  static cosineApprox(t: number, c?: number): number;
  static circularIn(t: number, c?: number): number;
  static circularOut(t: number, c?: number): number;
  static circularInOut(t: number, c?: number): number;
  static elasticIn(t: number, c?: number, p?: number): number;
  static elasticOut(t: number, c?: number, p?: number): number;
  static elasticInOut(t: number, c?: number, p?: number): number;
  static bounceIn(t: number, c?: number): number;
  static bounceOut(t: number, c?: number): number;
  static bounceInOut(t: number, c?: number): number;
  static sigmoid(t: number, c?: number, p?: number): number;
  static logSigmoid(t: number, c?: number, p?: number): number;
  static seat(t: number, c?: number, p?: number): number;
  static quadraticBezier(t: number, c?: number, p?: number | PtLike): number;
  static cubicBezier(t: number, c?: number, p1?: PtLike, p2?: PtLike): number;
  static quadraticTarget(t: number, c?: number, p1?: PtLike): number;
  static cliff(t: number, c?: number, p?: number): number;
  static step(
    fn: Function,
    steps: number,
    t: number,
    c: number,
    ...args: any[]
  ): any;
}
declare export class Range {
  constructor(g: GroupLike): Range;
  +max: Pt;
  +min: Pt;
  +magnitude: Pt;
  calc(): this;
  mapTo(min: number, max: number, exclude?: boolean[]): Group;
  append(g: GroupLike, update?: boolean): this;
  ticks(count: number): Group;
}

declare export class Line {
  static fromAngle(anchor: PtLike, angle: number, magnitude: number): Group;
  static slope(p1: PtLike | number[], p2: PtLike | number[]): number;
  static intercept(
    p1: PtLike | number[],
    p2: PtLike | number[],
  ): {
    slope: number,
    xi: number,
    yi: number,
  };
  static sideOfPt2D(line: GroupLike, pt: PtLike): number;
  static collinear(
    p1: PtLike | number[],
    p2: PtLike | number[],
    p3: PtLike | number[],
    threshold?: number,
  ): boolean;
  static magnitude(line: GroupLike): number;
  static magnitudeSq(line: GroupLike): number;
  static perpendicularFromPt(
    line: GroupLike,
    pt: PtLike | number[],
    asProjection?: boolean,
  ): Pt;
  static distanceFromPt(line: GroupLike, pt: PtLike | number[]): number;
  static intersectRay2D(la: GroupLike, lb: GroupLike): Pt;
  static intersectLine2D(la: GroupLike, lb: GroupLike): Pt;
  static intersectLineWithRay2D(line: GroupLike, ray: GroupLike): Pt;
  static intersectPolygon2D(
    lineOrRay: GroupLike,
    poly: GroupLike,
    sourceIsRay?: boolean,
  ): Group;
  static intersectLines2D(
    lines1: GroupLike[],
    lines2: GroupLike[],
    isRay?: boolean,
  ): Group;
  static intersectGridWithRay2D(
    ray: GroupLike,
    gridPt: PtLike | number[],
  ): Group;
  static intersectGridWithLine2D(
    line: GroupLike,
    gridPt: PtLike | number[],
  ): Group;
  static intersectRect2D(line: GroupLike, rect: GroupLike): Group;
  static subpoints(line: GroupLike | number[][], num: number): Group;
  static crop(
    line: GroupLike,
    size: PtLike,
    index?: number,
    cropAsCircle?: boolean,
  ): Pt;
  static marker(
    line: GroupLike,
    size: PtLike,
    graphic?: string,
    atTail?: boolean,
  ): Group;
  static toRect(line: GroupLike): Group;
}
declare export class Rectangle {
  static from(
    topLeft: PtLike | number[],
    widthOrSize: number | PtLike,
    height?: number,
  ): Group;
  static fromTopLeft(
    topLeft: PtLike | number[],
    widthOrSize: number | PtLike,
    height?: number,
  ): Group;
  static fromCenter(
    center: PtLike | number[],
    widthOrSize: number | PtLike,
    height?: number,
  ): Group;
  static toCircle(pts: GroupLike, within?: boolean): Group;
  static toSquare(pts: GroupLike, enclose?: boolean): Group;
  static size(pts: GroupLike): Pt;
  static center(pts: GroupLike): Pt;
  static corners(rect: GroupLike): Group;
  static sides(rect: GroupLike): Group[];
  static boundingBox(rects: GroupLike[]): Group;
  static polygon(rect: GroupLike): Group;
  static quadrants(rect: GroupLike, center?: PtLike): Group[];
  static halves(rect: GroupLike, ratio?: number, asRows?: boolean): Group[];
  static withinBound(rect: GroupLike, pt: PtLike): boolean;
  static hasIntersectRect2D(
    rect1: GroupLike,
    rect2: GroupLike,
    resetBoundingBox?: boolean,
  ): boolean;
  static intersectRect2D(rect1: GroupLike, rect2: GroupLike): Group;
}
declare export class Circle {
  static fromRect(pts: GroupLike, enclose?: boolean): Group;
  static fromTriangle(pts: GroupLike, enclose?: boolean): Group;
  static fromCenter(pt: PtLike, radius: number): Group;
  static withinBound(pts: GroupLike, pt: PtLike, threshold?: number): boolean;
  static intersectRay2D(pts: GroupLike, ray: GroupLike): Group;
  static intersectLine2D(pts: GroupLike, line: GroupLike): Group;
  static intersectCircle2D(pts: GroupLike, circle: GroupLike): Group;
  static intersectRect2D(pts: GroupLike, rect: GroupLike): Group;
  static toRect(pts: GroupLike, within?: boolean): Group;
  static toTriangle(pts: GroupLike, within?: boolean): Group;
}
declare export class Triangle {
  static fromRect(rect: GroupLike): Group;
  static fromCircle(circle: GroupLike): Group;
  static fromCenter(pt: PtLike, size: number): Group;
  static medial(pts: GroupLike): Group;
  static oppositeSide(pts: GroupLike, index: number): Group;
  static altitude(pts: GroupLike, index: number): Group;
  static orthocenter(pts: GroupLike): Pt;
  static incenter(pts: GroupLike): Pt;
  static incircle(pts: GroupLike, center?: Pt): Group;
  static circumcenter(pts: GroupLike): Pt;
  static circumcircle(pts: GroupLike, center?: Pt): Group;
}
declare export class Polygon {
  static centroid(pts: GroupLike): Pt;
  static rectangle(
    center: PtLike,
    widthOrSize: number | PtLike,
    height?: number,
  ): Group;
  static fromCenter(center: PtLike, radius: number, sides: number): Group;
  static lineAt(pts: GroupLike, idx: number): Group;
  static lines(pts: GroupLike, closePath?: boolean): Group[];
  static midpoints(pts: GroupLike, closePath?: boolean, t?: number): Group;
  static adjacentSides(
    pts: GroupLike,
    index: number,
    closePath?: boolean,
  ): Group[];
  static bisector(pts: GroupLike, index: number): Pt;
  static perimeter(
    pts: GroupLike,
    closePath?: boolean,
  ): {
    total: number,
    segments: Pt,
  };
  static area(pts: GroupLike): any;
  static convexHull(pts: GroupLike, sorted?: boolean): Group;
  static network(pts: GroupLike, originIndex?: number): Group[];
  static nearestPt(pts: GroupLike, pt: PtLike): number;
  static projectAxis(poly: GroupLike, unitAxis: Pt): Pt;

  static hasIntersectPoint(poly: GroupLike, pt: PtLike): boolean;
  static hasIntersectCircle(
    poly: GroupLike,
    circle: GroupLike,
  ): IntersectContext;
  static hasIntersectPolygon(
    poly1: GroupLike,
    poly2: GroupLike,
  ): IntersectContext;
  static intersectPolygon2D(poly1: GroupLike, poly2: GroupLike): Group;
  static toRects(polys: GroupLike[]): GroupLike[];
}
declare export class Curve {
  static getSteps(steps: number): Group;
  static controlPoints(
    pts: GroupLike,
    index?: number,
    copyStart?: boolean,
  ): Group;
  static _calcPt(ctrls: GroupLike, params: PtLike): Pt;
  static catmullRom(pts: GroupLike, steps?: number): Group;
  static catmullRomStep(step: Pt, ctrls: GroupLike): Pt;
  static cardinal(pts: GroupLike, steps?: number, tension?: number): Group;
  static cardinalStep(step: Pt, ctrls: GroupLike, tension?: number): Pt;
  static bezier(pts: GroupLike, steps?: number): Group;
  static bezierStep(step: Pt, ctrls: GroupLike): Pt;
  static bspline(pts: GroupLike, steps?: number, tension?: number): Group;
  static bsplineStep(step: Pt, ctrls: GroupLike): Pt;
  static bsplineTensionStep(step: Pt, ctrls: GroupLike, tension?: number): Pt;
}

declare export class World {
  constructor(
    bound: Group,
    friction?: number,
    gravity?: PtLike | number,
  ): World;
  bound: Bound;
  gravity: Pt;
  friction: number;
  damping: number;
  +bodyCount: number;
  +particleCount: number;
  body(id: number | string): any;
  particle(id: number | string): any;
  bodyIndex(name: string): number;
  particleIndex(name: string): number;
  update(ms: number): void;
  drawParticles(fn: (p: Particle, i: number) => void): void;
  drawBodies(fn: (p: Body, i: number) => void): void;
  add(p: Particle | Body, name?: string): this;
  removeBody(from: number | string, count?: number): this;
  removeParticle(from: number | string, count?: number): this;
  static edgeConstraint(
    p1: Particle,
    p2: Particle,
    dist: number,
    stiff?: number,
    precise?: boolean,
  ): Particle;
  static boundConstraint(p: Particle, rect: Group, damping?: number): void;
}
declare export class Space {
  id: string;

  refresh(b: boolean): this;
  add(
    p:
      | {
          animateID?: string,
          animate?: AnimateCallbackFn,
          resize?: (bound: Bound, evt?: Event) => void,
          action?: (type: string, px: number, py: number, evt: Event) => void,
          start?: (bound: Bound, space: this) => void,
        }
      | AnimateCallbackFn,
  ): this;
  remove(player: IPlayer): this;
  removeAll(): this;
  play(time?: number): this;
  replay(): void;

  pause(toggle?: boolean): this;
  resume(): this;
  stop(t?: number): this;
  playOnce(duration?: number): this;

  customRendering: (context: any, self: Space) => null;
  +isPlaying: boolean;
  +outerBound: Bound;
  +innerBound: Bound;
  +size: Pt;
  +center: Pt;
  +width: number;
  +height: number;
  resize(b: Bound, evt?: Event): this;
  clear(): this;
  getForm(): Form;
}
declare export class MultiTouchSpace extends Space {
  +pointer: Pt;
  bindCanvas(evt: string, callback: EventListener): void;
  unbindCanvas(evt: string, callback: EventListener): void;
  bindMouse(_bind?: boolean): this;
  bindTouch(_bind?: boolean): this;
  touchesToPoints(evt: TouchEvent, which?: TouchPointsKey): Pt[];
}

declare export class CanvasSpace extends MultiTouchSpace {
  constructor(elem: string | Element, callback?: Function): CanvasSpace;

  setup(opt: {
    bgcolor?: string,
    resize?: boolean,
    retina?: boolean,
    offscreen?: boolean,
  }): this;
  autoResize: boolean;
  resize(b: Bound, evt?: Event): this;

  background: string;
  +pixelScale: number;
  +hasOffscreen: boolean;
  +offscreenCtx: PtsCanvasRenderingContext2D;
  +offscreenCanvas: HTMLCanvasElement;
  getForm(): CanvasForm;
  +element: HTMLCanvasElement;
  +parent: Element;
  +ready: boolean;
  +ctx: PtsCanvasRenderingContext2D;
  clear(bg?: string): this;
  clearOffscreen(bg?: string): this;
}
export type CanvasLineCap = any
export type CanvasLineJoin = any
export type CanvasTextAlign = any
export type CanvasTextBaseline = any
export type SVGElement = any

declare export class CanvasForm extends VisualForm {
  constructor(space: CanvasSpace): CanvasForm;
  +space: CanvasSpace;
  useOffscreen(off?: boolean, clear?: boolean | string): this;
  renderOffscreen(offset?: PtLike): void;
  fill(c: string | boolean): this;
  stroke(
    c: string | boolean,
    width?: number,
    linejoin?: CanvasLineJoin,
    linecap?: CanvasLineCap,
  ): this;
  font(
    sizeOrFont: number | Font,
    weight?: string,
    style?: string,
    lineHeight?: number,
    family?: string,
  ): this;
  fontWidthEstimate(estimate?: boolean): this;
  getTextWidth(c: string): number;

  reset(): this;

  point(p: PtLike, radius?: number, shape?: string): this;
  static circle(
    ctx: CanvasRenderingContext2D,
    pt: PtLike,
    radius?: number,
  ): void;
  circle(pts: GroupLike | number[][]): this;
  static arc(
    ctx: CanvasRenderingContext2D,
    pt: PtLike,
    radius: number,
    startAngle: number,
    endAngle: number,
    cc?: boolean,
  ): void;
  arc(
    pt: PtLike,
    radius: number,
    startAngle: number,
    endAngle: number,
    cc?: boolean,
  ): this;
  static square(
    ctx: CanvasRenderingContext2D,
    pt: PtLike,
    halfsize: number,
  ): void;
  square(pt: PtLike, halfsize: number): this;
  static line(ctx: CanvasRenderingContext2D, pts: GroupLike | number[][]): void;
  line(pts: GroupLike | number[][]): this;
  static polygon(
    ctx: CanvasRenderingContext2D,
    pts: GroupLike | number[][],
  ): void;
  polygon(pts: GroupLike | number[][]): this;
  static rect(ctx: CanvasRenderingContext2D, pts: GroupLike | number[][]): void;
  rect(pts: number[][] | Pt[]): this;
  static image(
    ctx: CanvasRenderingContext2D,
    img: ImageBitmap,
    target?: PtLike | GroupLike,
    orig?: GroupLike,
  ): void;
  image(
    img: ImageBitmap,
    target: PtLike | GroupLike,
    original?: GroupLike,
  ): this;
  static text(
    ctx: CanvasRenderingContext2D,
    pt: PtLike,
    txt: string,
    maxWidth?: number,
  ): void;
  text(pt: PtLike, txt: string, maxWidth?: number): this;
  textBox(
    box: GroupLike,
    txt: string,
    verticalAlign?: string,
    tail?: string,
    overrideBaseline?: boolean,
  ): this;
  paragraphBox(
    box: GroupLike,
    txt: string,
    lineHeight?: number,
    verticalAlign?: string,
    crop?: boolean,
  ): this;
  alignText(alignment?: CanvasTextAlign, baseline?: CanvasTextBaseline): this;
  log(txt: any): this;
}

declare export class Color extends Pt {
  static ranges: {
    [name: string]: Group,
  };
  constructor(...args: any[]): Color;
  static from(...args: any[]): *;
  static fromHex(hex: string): Color;
  static rgb(...args: any[]): Color;
  static hsl(...args: any[]): Color;
  static hsb(...args: any[]): Color;
  static lab(...args: any[]): Color;
  static lch(...args: any[]): Color;
  static luv(...args: any[]): Color;
  static xyz(...args: any[]): Color;
  static maxValues(mode: string): Pt;
  +hex: string;
  +rgb: string;
  +rgba: string;
  clone(): Color;
  toMode(mode: ColorType, convert?: boolean): this;
  +mode: ColorType;
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
  a: number;
  c: number;
  u: number;
  v: number;
  +alpha: number;
  normalized: boolean;
  normalize(toNorm?: boolean): Color;
  $normalize(toNorm?: boolean): Color;
  toString(format?: 'hex' | 'rgb' | 'rgba' | 'mode'): string;
  static RGBtoHSL(
    rgb: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static HSLtoRGB(
    hsl: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static RGBtoHSB(
    rgb: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static HSBtoRGB(
    hsb: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static RGBtoLAB(
    rgb: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static LABtoRGB(
    lab: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static RGBtoLCH(
    rgb: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static LCHtoRGB(
    lch: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static RGBtoLUV(
    rgb: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static LUVtoRGB(
    luv: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static RGBtoXYZ(
    rgb: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static XYZtoRGB(
    xyz: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static XYZtoLAB(
    xyz: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static LABtoXYZ(
    lab: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static XYZtoLUV(
    xyz: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static LUVtoXYZ(
    luv: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static LABtoLCH(
    lab: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
  static LCHtoLAB(
    lch: Color,
    normalizedInput?: boolean,
    normalizedOutput?: boolean,
  ): Color;
}

declare export class Create {
  static distributeRandom(
    bound: Bound,
    count: number,
    dimensions?: number,
  ): Group;
  static distributeLinear(line: GroupLike, count: number): Group;
  static gridPts(
    bound: Bound,
    columns: number,
    rows: number,
    orientation?: PtLike,
  ): Group;
  static gridCells(bound: Bound, columns: number, rows: number): Group[];
  static radialPts(center: PtLike, radius: number, count: number): Group;
  static noisePts(
    pts: GroupLike,
    dx?: number,
    dy?: number,
    rows?: number,
    columns?: number,
  ): Group;
  static delaunay(pts: GroupLike): Delaunay;
}
declare export class Noise extends Pt {
  constructor(...args: any[]): Noise;
  initNoise(...args: any[]): void;
  step(x?: number, y?: number): void;
  seed(s: any): void;
  noise2D(): number;
}
declare export class Delaunay extends Group {
  delaunay(triangleOnly?: boolean): GroupLike[] | DelaunayShape[];
  voronoi(): Group[];
  mesh(): DelaunayMesh;
  neighborPts(i: number, sort?: boolean): GroupLike;
  neighbors(i: number): DelaunayShape[];
}

declare export class DOMSpace extends MultiTouchSpace {
  id: string;

  constructor(elem: string | Element, callback?: Function): DOMSpace;
  static createElement(elem: string, id: string, appendTo?: Element): Element;
  setup(opt: {
    bgcolor?: string,
    resize?: boolean,
  }): this;
  getForm(): Form;
  autoResize: boolean;
  resize(b: Bound, evt?: Event): this;

  +element: Element;
  +parent: Element;
  +ready: boolean;
  clear(bg?: string): this;
  background: string;
  style(key: string, val: string, update?: boolean): this;
  styles(styles: Object, update?: boolean): this;
  static setAttr(elem: Element, data: Object): Element;
  static getInlineStyles(data: Object): string;
}
declare export class HTMLSpace extends DOMSpace {
  getForm(): Form;
  static htmlElement(
    parent: Element,
    name: string,
    id?: string,
    autoClass?: boolean,
  ): HTMLElement;
  remove(player: IPlayer): this;
  removeAll(): this;
}
declare export class HTMLForm extends VisualForm {
  static groupID: number;
  static domID: number;

  constructor(space: HTMLSpace): HTMLForm;
  +space: HTMLSpace;

  fill(c: string | boolean): this;
  stroke(
    c: string | boolean,
    width?: number,
    linejoin?: string,
    linecap?: string,
  ): this;
  fillText(c: string): this;
  cls(c: string | boolean): this;
  font(
    sizeOrFont: number | Font,
    weight?: string,
    style?: string,
    lineHeight?: number,
    family?: string,
  ): this;
  reset(): this;
  updateScope(group_id: string, group?: Element): Object;
  scope(item: IPlayer): Object;
  nextID(): string;
  static getID(ctx: any): string;
  static scopeID(item: IPlayer): string;
  static style(elem: Element, styles: Object): Element;
  static rectStyle(
    ctx: DOMFormContext,
    pt: PtLike,
    size: PtLike,
  ): DOMFormContext;
  static point(
    ctx: DOMFormContext,
    pt: PtLike,
    radius?: number,
    shape?: string,
  ): Element;
  point(pt: PtLike, radius?: number, shape?: string): this;
  static circle(ctx: DOMFormContext, pt: PtLike, radius?: number): Element;
  circle(pts: GroupLike | number[][]): this;
  static square(ctx: DOMFormContext, pt: PtLike, halfsize: number): HTMLElement;
  square(pt: PtLike, halfsize: number): this;
  static rect(ctx: DOMFormContext, pts: GroupLike | number[][]): Element;
  rect(pts: number[][] | Pt[]): this;
  static text(ctx: DOMFormContext, pt: PtLike, txt: string): Element;
  text(pt: PtLike, txt: string): this;
  log(txt: any): this;
  arc(
    pt: PtLike,
    radius: number,
    startAngle: number,
    endAngle: number,
    cc?: boolean,
  ): this;
  line(pts: GroupLike | number[][]): this;
  polygon(pts: GroupLike | number[][]): this;
}

declare export class Particle extends Pt {
  constructor(...args: any[]): Particle;
  mass: number;
  radius: number;
  previous: Pt;
  force: Pt;
  body: Body;
  lock: boolean;
  +changed: Pt;
  position: Pt;
  size(r: number): this;
  addForce(...args: any[]): Pt;
  verlet(dt: number, friction: number, lastDt?: number): this;
  hit(...args: any[]): this;
  collide(p2: Particle, damp?: number): void;
  toString(): string;
}
declare export class Body extends Group {
  constructor(): Body;
  static fromGroup(
    list: GroupLike,
    stiff?: number,
    autoLink?: boolean,
    autoMass?: boolean,
  ): Body;
  init(list: GroupLike, stiff?: number): this;
  mass: number;
  autoMass(): this;
  link(index1: number, index2: number, stiff?: number): this;
  linkAll(stiff: number): void;
  linksToLines(): Group[];
  processEdges(): void;
  processBody(b: Body): void;
  processParticle(b: Particle): void;
}

declare export class Pt extends Float32Array implements IPt, Iterable<number> {
  constructor(...args: any[]): Pt;
  static make(
    dimensions: number,
    defaultValue?: number,
    randomize?: boolean,
  ): this;
  id: string;
  x: number;
  y: number;
  z: number;
  w: number;
  clone(): Pt;
  equals(p: PtLike, threshold?: number): boolean;
  to(...args: any[]): this;
  $to(...args: any[]): Pt;
  toAngle(radian: number, magnitude?: number, anchorFromPt?: boolean): this;
  op(fn: (p1: PtLike, ...rest: any[]) => any): (...rest: any[]) => any;
  ops(
    fns: ((p1: PtLike, ...rest: any[]) => any)[],
  ): ((...rest: any[]) => any)[];
  $take(axis: string | number[]): Pt;
  $concat(...args: any[]): Pt;
  add(...args: any[]): this;
  $add(...args: any[]): Pt;
  subtract(...args: any[]): this;
  $subtract(...args: any[]): Pt;
  multiply(...args: any[]): this;
  $multiply(...args: any[]): Pt;
  divide(...args: any[]): this;
  $divide(...args: any[]): Pt;
  magnitudeSq(): number;
  magnitude(): number;
  unit(magnitude?: number): Pt;
  $unit(magnitude?: number): Pt;
  dot(...args: any[]): number;
  $cross2D(...args: any[]): number;
  $cross(...args: any[]): Pt;
  $project(...args: any[]): Pt;
  projectScalar(...args: any[]): number;
  abs(): Pt;
  $abs(): Pt;
  floor(): Pt;
  $floor(): Pt;
  ceil(): Pt;
  $ceil(): Pt;
  round(): Pt;
  $round(): Pt;
  minValue(): {
    value: number,
    index: number,
  };
  maxValue(): {
    value: number,
    index: number,
  };
  $min(...args: any[]): Pt;
  $max(...args: any[]): Pt;
  angle(axis?: string | number[]): number;
  angleBetween(p: Pt, axis?: string | number[]): number;
  scale(scale: number | number[] | PtLike, anchor?: PtLike): this;
  rotate2D(angle: number, anchor?: PtLike, axis?: string): this;
  shear2D(
    scale: number | number[] | PtLike,
    anchor?: PtLike,
    axis?: string,
  ): this;
  reflect2D(line: GroupLike, axis?: string): this;
  toString(): string;
  toArray(): number[];
}
declare export class Group extends Array<Pt> {
  constructor(...args: Pt[]): Group;
  id: string;
  +p1: Pt;
  +p2: Pt;
  +p3: Pt;
  +p4: Pt;
  +q1: Pt;
  +q2: Pt;
  +q3: Pt;
  +q4: Pt;
  clone(): Group;
  static fromArray(list: PtLike[]): Group;
  static fromPtArray(list: GroupLike): Group;
  split(chunkSize: number, stride?: number, loopBack?: boolean): Group[];
  insert(pts: GroupLike, index?: number): this;
  remove(index?: number, count?: number): Group;
  segments(
    pts_per_segment?: number,
    stride?: number,
    loopBack?: boolean,
  ): Group[];
  lines(): Group[];
  centroid(): Pt;
  boundingBox(): Group;
  anchorTo(ptOrIndex?: PtLike | number): void;
  anchorFrom(ptOrIndex?: PtLike | number): void;
  op(fn: (g1: GroupLike, ...rest: any[]) => any): (...rest: any[]) => any;
  ops(
    fns: ((g1: GroupLike, ...rest: any[]) => any)[],
  ): ((...rest: any[]) => any)[];
  interpolate(t: number): Pt;
  moveBy(...args: any[]): this;
  moveTo(...args: any[]): this;
  scale(scale: number | number[] | PtLike, anchor?: PtLike): this;
  rotate2D(angle: number, anchor?: PtLike, axis?: string): this;
  shear2D(
    scale: number | number[] | PtLike,
    anchor?: PtLike,
    axis?: string,
  ): this;
  reflect2D(line: GroupLike, axis?: string): this;
  sortByDimension(dim: number, desc?: boolean): this;
  forEachPt(ptFn: string, ...args: any[]): this;
  add(...args: any[]): this;
  subtract(...args: any[]): this;
  multiply(...args: any[]): this;
  divide(...args: any[]): this;
  $matrixAdd(g: GroupLike | number[][] | number): Group;
  $matrixMultiply(
    g: GroupLike | number,
    transposed?: boolean,
    elementwise?: boolean,
  ): Group;
  zipSlice(index: number, defaultValue?: number | boolean): Pt;
  $zip(defaultValue?: number | boolean, useLongest?: boolean): Group;
  toString(): string;
}
declare export class Bound extends Group implements IPt {
  constructor(...args: Pt[]): Bound;
  static fromBoundingRect(rect: ClientRect): Bound;
  static fromGroup(g: GroupLike): Bound;

  clone(): Bound;

  size: Pt;
  center: Pt;
  topLeft: Pt;
  bottomRight: Pt;
  width: number;
  height: number;
  depth: number;
  +x: number;
  +y: number;
  +z: number;
  +inited: boolean;
  update(): this;
}

declare export class SVGSpace extends DOMSpace {
  id: string;

  constructor(elem: string | Element, callback?: Function): SVGSpace;
  getForm(): SVGForm;
  +element: Element;
  resize(b: Bound, evt?: Event): this;
  static svgElement(parent: Element, name: string, id?: string): SVGElement;
  remove(player: IPlayer): this;
  removeAll(): this;
}
declare export class SVGForm extends VisualForm {
  static groupID: number;
  static domID: number;

  constructor(space: SVGSpace): SVGForm;
  +space: SVGSpace;
  styleTo(k: any, v: any): void;
  fill(c: string | boolean): this;
  stroke(
    c: string | boolean,
    width?: number,
    linejoin?: string,
    linecap?: string,
  ): this;
  cls(c: string | boolean): this;
  font(
    sizeOrFont: number | Font,
    weight?: string,
    style?: string,
    lineHeight?: number,
    family?: string,
  ): this;
  reset(): this;
  updateScope(group_id: string, group?: Element): Object;
  scope(item: IPlayer): Object;
  nextID(): string;
  static getID(ctx: any): string;
  static scopeID(item: IPlayer): string;
  static style(elem: SVGElement, styles: Object): Element;
  static point(
    ctx: DOMFormContext,
    pt: PtLike,
    radius?: number,
    shape?: string,
  ): SVGElement;
  point(pt: PtLike, radius?: number, shape?: string): this;
  static circle(ctx: DOMFormContext, pt: PtLike, radius?: number): SVGElement;
  circle(pts: GroupLike | number[][]): this;
  static arc(
    ctx: DOMFormContext,
    pt: PtLike,
    radius: number,
    startAngle: number,
    endAngle: number,
    cc?: boolean,
  ): SVGElement;
  arc(
    pt: PtLike,
    radius: number,
    startAngle: number,
    endAngle: number,
    cc?: boolean,
  ): this;
  static square(ctx: DOMFormContext, pt: PtLike, halfsize: number): SVGElement;
  square(pt: PtLike, halfsize: number): this;
  static line(ctx: DOMFormContext, pts: GroupLike | number[][]): SVGElement;
  line(pts: GroupLike | number[][]): this;

  static polygon(ctx: DOMFormContext, pts: GroupLike | number[][]): SVGElement;
  polygon(pts: GroupLike | number[][]): this;
  static rect(ctx: DOMFormContext, pts: GroupLike | number[][]): SVGElement;
  rect(pts: number[][] | Pt[]): this;
  static text(ctx: DOMFormContext, pt: PtLike, txt: string): SVGElement;
  text(pt: PtLike, txt: string): this;
  log(txt: any): this;
}

export interface IPt {
  +x?: number;
  +y?: number;
  +z?: number;
  +w?: number;
}
export type PtLike = Pt | Float32Array | number[]
export type GroupLike = Group | $ReadOnlyArray<Iterable<number>>
export type AnimateCallbackFn = (
  time?: number,
  frameTime?: number,
  currentSpace?: any,
) => void
export interface IPlayer {
  animateID?: string;
  animate?: AnimateCallbackFn;
  resize?: (bound: Bound, evt?: Event) => void;
  action?: (type: string, px: number, py: number, evt: Event) => void;
  start?: (bound: Bound, space: Space) => void;
}
export interface ISpacePlayers {
  [key: string]: IPlayer;
}
export interface ITimer {
  prev: number;
  diff: number;
  end: number;
}
export type TouchPointsKey = 'touches' | 'changedTouches' | 'targetTouches'
export interface MultiTouchElement {
  addEventListener(evt: any, callback: Function): any;
  removeEventListener(evt: any, callback: Function): any;
}
export interface PtsCanvasRenderingContext2D extends CanvasRenderingContext2D {
  webkitBackingStorePixelRatio?: number;
  mozBackingStorePixelRatio?: number;
  msBackingStorePixelRatio?: number;
  oBackingStorePixelRatio?: number;
  backingStorePixelRatio?: number;
}
export type ColorType = 'rgb' | 'hsl' | 'hsb' | 'lab' | 'lch' | 'luv' | 'xyz'
export type DelaunayShape = {
  i: number,
  j: number,
  k: number,
  triangle: GroupLike,
  circle: Group,
}
export type DelaunayMesh = {
  [key: string]: DelaunayShape,
}[]
export type DOMFormContext = {
  group: Element,
  groupID: string,
  groupCount: number,
  currentID: string,
  currentClass?: string,
  style: Object,
  font: string,
  fontSize: number,
  fontFamily: string,
}
export type IntersectContext = {
  which: number,
  dist: number,
  normal: Pt,
  vertex: Pt,
  edge: Group,
  other?: any,
}
export type UIHandler = (target: UI, pt: PtLike, type: string) => void
export type WarningType = 'error' | 'warn' | 'mute'

declare export class Typography {
  static textWidthEstimator(
    fn: (string: any) => number,
    samples?: string[],
    distribution?: number[],
  ): (string: any) => number;
  static truncate(
    fn: (string: any) => number,
    str: string,
    width: number,
    tail?: string,
  ): [string, number];
  static fontSizeToBox(
    box: GroupLike,
    ratio?: number,
    byHeight?: boolean,
  ): (GroupLike: any) => number;
  static fontSizeToThreshold(
    threshold: number,
    direction?: number,
  ): (a: number, b: number) => number;
}

declare export var UIShape: {
  rectangle: string,
  circle: string,
  polygon: string,
  polyline: string,
  line: string,
}
declare export var UIPointerActions: {
  up: string,
  down: string,
  move: string,
  drag: string,
  uidrag: string,
  drop: string,
  over: string,
  out: string,
  enter: string,
  leave: string,
  all: string,
}
declare export class UI {
  _group: Group;
  _shape: string;

  constructor(
    group: GroupLike,
    shape: string,
    states?: {
      [key: string]: any,
    },
    id?: string,
  ): UI;
  static fromRectangle(group: GroupLike, states?: {}, id?: string): this;
  static fromCircle(group: GroupLike, states?: {}, id?: string): this;
  static fromPolygon(
    group: GroupLike,
    states?: {},
    id?: string,
  ): this;
  static fromUI(ui: UI, states?: Object, id?: string): this;
  id: string;
  group: Group;
  shape: string;
  state(key: string, value?: any): any;
  on(key: string, fn: UIHandler): number;
  off(key: string, which?: number): boolean;
  listen(key: string, p: PtLike): boolean;

  static track(uis: UI[], key: string, p: PtLike): void;
  render(
    fn: (
      group: Group,
      states: {
        [key: string]: any,
      },
    ) => void,
  ): void;
  toString(): string;
}
declare export class UIButton extends UI {
  constructor(
    group: GroupLike,
    shape: string,
    states?: {
      [key: string]: any,
    },
    id?: string,
  ): UIButton;
  onClick(fn: UIHandler): number;
  offClick(id: number): boolean;
  onHover(enter?: UIHandler, leave?: UIHandler): number[];
  offHover(enterID?: number, leaveID?: number): boolean[];
}
declare export class UIDragger extends UIButton {
  constructor(
    group: GroupLike,
    shape: string,
    states?: {
      [key: string]: any,
    },
    id?: string,
  ): UIDragger;
  onDrag(fn: UIHandler): number;
  offDrag(id: number): boolean;
  onDrop(fn: UIHandler): number;
  offDrop(id: number): boolean;
}

declare export var Const: {
  xy: string,
  yz: string,
  xz: string,
  xyz: string,
  horizontal: number,
  vertical: number,
  identical: number,
  right: number,
  bottom_right: number,
  bottom: number,
  bottom_left: number,
  left: number,
  top_left: number,
  top: number,
  top_right: number,
  epsilon: number,
  max: number,
  min: number,
  pi: number,
  two_pi: number,
  half_pi: number,
  quarter_pi: number,
  one_degree: number,
  rad_to_deg: number,
  deg_to_rad: number,
  gravity: number,
  newton: number,
  gaussian: number,
}
declare export class Util {
  static _warnLevel: WarningType;
  static warnLevel(lv?: WarningType): WarningType;
  static getArgs(args: any[]): Array<number>;
  static warn(message?: string, defaultReturn?: any): any;
  static randomInt(range: number, start?: number): number;
  static split(
    pts: any[],
    size: number,
    stride?: number,
    loopBack?: boolean,
  ): any[][];
  static flatten(pts: any[], flattenAsGroup?: boolean): any;
  static combine<T>(a: T[], b: T[], op: (a: T, b: T) => T): T[];
  static zip(arrays: Array<any>[]): any[];
  static stepper(
    max: number,
    min?: number,
    stride?: number,
    callback?: (n: number) => void,
  ): () => number;
  static forRange(
    fn: (index: number) => any,
    range: number,
    start?: number,
    step?: number,
  ): any[];
  static load(
    url: string,
    callback: (response: string, success: boolean) => void,
  ): void;
}
