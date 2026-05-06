import { HashMap } from "../src/hashMap";

describe("HashMap methods testing", () => {
  let map;
  let filledMap;

  beforeEach(() => {
    map = new HashMap();

    filledMap = new HashMap();
    filledMap.set("apple", "red");
    filledMap.set("banana", "yellow");
    filledMap.set("carrot", "orange");
    filledMap.set("dog", "brown");
    filledMap.set("elephant", "gray");
    filledMap.set("frog", "green");
    filledMap.set("grape", "purple");
    filledMap.set("hat", "black");
    filledMap.set("ice cream", "white");
    filledMap.set("jacket", "blue");
    filledMap.set("kite", "pink");
    filledMap.set("lion", "golden");
  });

  test("hash: should always return same values for a key", () => {
    const a1 = map.hash("apple");
    const a2 = map.hash("apple");
    const isEqual = a1 === a2;
    expect(isEqual).toBe(true);
  });

  test("initiation: should create an array with capacity number of arrays", () => {
    expect(map.buckets).toEqual([
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ]);
  });

  test("set: should set new values to the buckets", () => {
    map.set("apple", "red");
    map.set("banana", "yellow");
    map.set("carrot", "orange");
    expect(map.buckets.sort()).toEqual([
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [{ carrot: "orange" }],
      [{ banana: "yellow" }],
      [{ apple: "red" }],
    ]);
  });

  test("set: should replace old values if the key is the same", () => {
    map.set("apple", "red");
    map.set("banana", "yellow");
    map.set("apple", "green");
    expect(map.buckets.sort()).toEqual([
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [{ banana: "yellow" }],
      [{ apple: "green" }],
    ]);
  });

  test("set: should handle collisions", () => {
    map.set("apple", "red");
    map.set("banana", "yellow");
    map.set("Rama", "green");
    map.set("Sita", "yellow");
    expect(map.buckets.sort()).toEqual([
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [{ banana: "yellow" }],
      [{ apple: "red" }],
      [{ Rama: "green" }, { Sita: "yellow" }],
    ]);
  });

  test("get: should return value for the provided key", () => {
    expect(filledMap.get("apple")).toBe("red");
  });

  test("get: should return null for the provided key if it is missing", () => {
    map.set("apple", "red");
    expect(filledMap.get("pineapple")).toBe(null);
  });

  test("has: should return false if key is not in the hash map", () => {
    expect(filledMap.has("strawberry")).toBe(false);
  });

  test("has: should return true if key is in the hash map", () => {
    expect(filledMap.has("carrot")).toBe(true);
  });

  test("remove: should return false if key is not in the hash map", () => {
    expect(filledMap.remove("aPPLe")).toBe(false);
  });

  test("remove: should return true and remove entry from hash map if key is in the hash map", () => {
    expect(filledMap.remove("banana")).toBe(true);
    expect(filledMap.has("banana")).toBe(false);
  });

  test("length: should return correct number of keys in the buckets", () => {
    expect(map.length()).toBe(0);
    expect(filledMap.length()).toBe(12);
  });

  test("clear: should remove all entries from the map", () => {
    filledMap.clear();
    expect(filledMap.length()).toBe(0);
  });

  test("keys: should return an array containing all the keys from hash map", () => {
    expect(map.keys()).toEqual([]);
    expect(filledMap.keys().sort()).toEqual(
      [
        "apple",
        "banana",
        "carrot",
        "dog",
        "elephant",
        "frog",
        "grape",
        "hat",
        "ice cream",
        "jacket",
        "kite",
        "lion",
      ].sort()
    );
  });

  test("values: should return an array containing all the values from hash map", () => {
    expect(map.values()).toEqual([]);
    expect(filledMap.values().sort()).toEqual(
      [
        "red",
        "yellow",
        "orange",
        "brown",
        "gray",
        "green",
        "purple",
        "black",
        "white",
        "blue",
        "pink",
        "golden",
      ].sort()
    );
  });

  test("entries: should return an array containing arrays of key value pairs from hash map", () => {
    expect(map.entries()).toEqual([]);
    expect(filledMap.entries().sort()).toEqual(
      [
        ["apple", "red"],
        ["banana", "yellow"],
        ["carrot", "orange"],
        ["dog", "brown"],
        ["elephant", "gray"],
        ["frog", "green"],
        ["grape", "purple"],
        ["hat", "black"],
        ["ice cream", "white"],
        ["jacket", "blue"],
        ["kite", "pink"],
        ["lion", "golden"],
      ].sort()
    );
  });

  test("growth: setting new values, should not trigger growth before threshold", () => {
    filledMap.set("apple", "green");
    filledMap.set("elephant", "pink");
    filledMap.set("lion", "hungry");
    expect(filledMap.capacity).toBe(16);
  });

  test("growth: should double capacity after threshhold has been passed and keep all entries", () => {
    filledMap.set("fox", "sneaky");
    expect(filledMap.length()).toBe(13);
    expect(filledMap.capacity).toBe(32);
  });

  test("growth: rest of the methods should be working after growth", () => {
    filledMap.remove("lion");
    filledMap.set("fox", "sneaky");
    filledMap.set("snake", "sssss");
    filledMap.set("tiger", "meooow");
    expect(filledMap.capacity).toBe(32);
    expect(filledMap.get("banana")).toBe("yellow");
    expect(filledMap.has("lion")).toBe(false);
    expect(filledMap.get("snake")).toBe("sssss");

    filledMap.clear();
    expect(filledMap.length()).toBe(0);
  });

  test("growth: triggers after second threshold has been passed", () => {
    for (let i = 0; i < 14; i++) {
      filledMap.set(`key ${i}`, `value ${i}`);
    }

    expect(filledMap.capacity).toBe(64);
    expect(filledMap.length()).toBe(26);
  });
});
