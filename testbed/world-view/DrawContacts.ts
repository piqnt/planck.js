import { Middleware } from "polymatic";
import { TestbedContext } from "../testbed/TestbedContext";
import { GLDraw } from "../gl/GLDraw";

import { WorldManifold } from "planck";

const CONTACT_NORMAL_LENGTH = 0.3;

/** the touching contacts' manifold points, and their normals */
export class DrawContacts extends Middleware<TestbedContext> {
  private draw = new GLDraw();
  private manifold = new WorldManifold();

  constructor() {
    super();
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }

  handleFrameRender = () => {
    const world = this.context.world.value;
    if (!world) return;
    const renderConfig = this.context.renderConfig.value;

    if (!renderConfig.contact) return;

    for (let contact = world.getContactList(); contact; contact = contact.getNext()) {
      if (!contact.isTouching()) continue;
      const manifold = contact.getWorldManifold(this.manifold);
      if (!manifold) continue;
      const normal = manifold.normal;
      for (let i = 0; i < manifold.pointCount; i++) {
        const point = manifold.points[i];
        this.draw.drawScreenPoint(point, 5, "blue");

        if (renderConfig.contactNormals) {
          const p2 = {
            x: point.x + normal.x * CONTACT_NORMAL_LENGTH,
            y: point.y + normal.y * CONTACT_NORMAL_LENGTH,
          };
          this.draw.drawEdge(point, p2, "dimgray");
        }
      }
    }
  };
}
