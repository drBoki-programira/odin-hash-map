class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  buckets = 0;

  constructor() {
    this._initiateBuckets();
  }

  _initiateBuckets() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  _findBucket(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return this.buckets[index];
  }

  set(key, value) {
    const bucket = this._findBucket(key);
    const entry = bucket.find((pair) => Object.hasOwn(pair, key));

    if (entry) entry[key] = value;
    else bucket.push({ [key]: value });

    const threshhold = this.loadFactor * this.capacity;
    if (this.length() > threshhold) this._growMap();
  }

  get(key) {
    const bucket = this._findBucket(key);
    const entry = bucket.find((pair) => Object.hasOwn(pair, key));
    return entry ? entry[key] : null;
  }

  has(key) {
    const bucket = this._findBucket(key);
    const entry = bucket.find((pair) => Object.hasOwn(pair, key));
    return entry ? true : false;
  }

  remove(key) {
    const bucket = this._findBucket(key);
    const index = bucket.findIndex((entry) => Object.hasOwn(entry, key));

    if (index !== -1) {
      bucket.splice(index, 1);
      return true;
    } else return false;
  }

  length() {
    return this.buckets.reduce((prev, curr) => {
      return prev + curr.length;
    }, 0);
  }

  clear() {
    this.buckets.forEach((bucket) => {
      bucket.length = 0;
    });
  }

  _fetch(func) {
    const array = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((entry) => {
        const item = func(entry);
        array.push(...item);
      });
    });

    return array;
  }

  keys() {
    return this._fetch(Object.keys);
  }

  values() {
    return this._fetch(Object.values);
  }

  entries() {
    return this._fetch(Object.entries);
  }

  _growMap() {
    this.capacity *= 2;
    const entries = this.entries();
    this._initiateBuckets();
    entries.forEach((entry) => this.set(entry[0], entry[1]));
  }
}

export { HashMap };
