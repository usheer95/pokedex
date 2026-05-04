
export type CacheEntry<T> = {
    createdAt: number
    val: T
}

export class Cache {
    #cache: Map<string, CacheEntry<any>>
    #reapIntervalId: NodeJS.Timeout | undefined
    #interval: number;

    constructor(interval: number) {
        this.#cache = new Map<string, CacheEntry<any>>();
        this.#interval = interval
        this.#reapIntervalId = undefined
        this.#startReapLoop()
    }

    #isOldEntry(entry: CacheEntry<any>) {
        if (entry.createdAt < (Date.now() - this.#interval) ){
            return true
        }
        return false
    }

    add<T>(key: string, value: T) : void {

        let cacheEntry: CacheEntry<T> = {
            val: value,
            createdAt: Date.now()
        }

        this.#cache.set(key, cacheEntry);
    };

    get<T>(key: string) : T | undefined {
        return this.#cache.get(key)?.val
    }

    #reap() : void { 
        for (let [key, value] of this.#cache) {

            if (this.#isOldEntry(value)) {
                this.#cache.delete(key)
            }
        }
    }

    #startReapLoop() : void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval)
    }

    stopReapLoop() : void {

        if (!this.#reapIntervalId) {
            // No interval to stop
            return;
        }

        clearInterval(this.#reapIntervalId); 
        this.#reapIntervalId = undefined;
    }  
}
