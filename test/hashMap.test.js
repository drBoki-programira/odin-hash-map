import { HashMap } from "../src/hashMap";

describe("HashMap methods testing", () => {
  let map;

  beforeEach(() => {
    map = new HashMap();
  });

  test("hash: should always return same values for a key", () => {
    const a1 = map.hash("apple")
    const a2 = map.hash("apple")
    const isEqual = a1 === a2

    let b1 = map.hash("Rama")
    let b2 = map.hash("Sita")
    console.log(a1, a2, b1, b2)
    expect(isEqual).toBe(true)
  })

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
    map.set("Sita", "yellow")
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
      [{ Rama: "green"}, { Sita: "yellow"}],
    ]);
  });

  test("get: should return value for the provided key", () => {
    map.set("apple", "red");
    expect(map.get("apple")).toBe("red")
  })

  test("get: should return null for the provided key if it is missing", () => {
    map.set("apple", "red");
    expect(map.get("banana")).toBe(null)
  })
});
