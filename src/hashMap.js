class HashMap {
  loadFactor = 0.75
  capacity = 16
  
  constructor() {
    this.buckets = Array.from({ length: this.capacity}, () => [])
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
  
  set(key, value) {
    const hashedKey = this.hash(key)
    const bucket = this.buckets[hashedKey]
    const item = bucket.find(pair => Object.hasOwn(pair, key))

    if (item) item[key] = value
    else bucket.push({ [key]: value })
  }

  get(key) {
    const hashedKey = this.hash(key)
    const bucket = this.buckets[hashedKey]
    const item = bucket.find(pair => Object.hasOwn(pair, key))

    const value = (item) ? item[key] : null
    return value
  }
}

export { HashMap }
