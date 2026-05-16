export type CacheEntry<T> = {
  value: T;
  createdAt: number;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, value: T) {
    this.#cache.set(key, {
      value,
      createdAt: Date.now(),
    });
  }

  get<T>(key: string): T | undefined {
    if (this.#cache.has(key)) {
      return this.#cache.get(key)?.value;
    }
    return undefined;
  }

  #reap() {
    for (let [key, value] of this.#cache) {
      if (
        value.createdAt < Date.now() - this.#interval &&
        this.#cache.has(key)
      ) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }
  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
