import { Pool } from "../util/Pool";

/**
 * TODO this is currently just an object pool imitating the b2SlabAllocator
 * class
 * 
 * TODO this currently leaks memory (because the objects never gets freed)
 */
export default class b2SlabAllocator<T> {

  private pool: Pool<T>;
  private create: () => T;
  private itemsPerSlab: number;

  constructor(itemsPerSlab: number, create: () => T) {
    this.itemsPerSlab = itemsPerSlab;
    this.create = create;
    this.pool = new Pool({
      max: Infinity, // TODO
    });
  }
  allocate() {
    // TODO integrate itemsPerSlab directly into Pool
    if (this.pool.size() == 0) {
      for (let i = 0; i < this.itemsPerSlab; i++) {
        this.pool.release(this.create());
      }
    }
    return this.pool.allocate()
  }
  setItemsPerSlab(itemsPerSlab: number) {
    this.itemsPerSlab = itemsPerSlab;
  }
  free(obj: T) {
    this.pool.release(obj);
  }
}