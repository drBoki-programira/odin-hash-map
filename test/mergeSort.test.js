import mergeSort from "../src/mergeSort";

describe("Merge sort algorithm", () => {
  test("Returns an empty array if input is []", () => {
    expect(mergeSort([])).toEqual([]);
  });

  test("Returns single element array if input is one element array", () => {
    expect(mergeSort([42])).toEqual([42]);
  });

  test("If the array is already sorted it returns it the same", () => {
    expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("Sorts correctly odd number of elements", () => {
    expect(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])).toEqual([
      0, 1, 1, 2, 3, 5, 8, 13,
    ]);
  });

  test("Sorts correctly even number of elements", () => {
    expect(mergeSort([105, 79, 100, 110])).toEqual([79, 100, 105, 110]);
  });
});
