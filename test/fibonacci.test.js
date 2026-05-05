import { fibs, fibsRec } from "../src/fibbonaci";

const fibbonaci = fibsRec;

describe("fibonacci", () => {
  test("Gets one element of fibbonaci", () => {
    expect(fibbonaci(1)).toEqual([0]);
  });

  test("Gets two elements of fibbonaci", () => {
    expect(fibbonaci(2)).toEqual([0, 1]);
  });

  test("Gets three elements of fibbonaci", () => {
    expect(fibbonaci(3)).toEqual([0, 1, 1]);
  });

  test("Gets four elements of fibbonaci", () => {
    expect(fibbonaci(4)).toEqual([0, 1, 1, 2]);
  });

  test("Gets six elements of fibbonaci", () => {
    expect(fibbonaci(6)).toEqual([0, 1, 1, 2, 3, 5]);
  });

  test("Gets nine elements of fibbonaci", () => {
    expect(fibbonaci(9)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21]);
  });
});
