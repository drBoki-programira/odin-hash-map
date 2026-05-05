export default mergeSort = function (array) {
  if (array.length <= 1) return array;

  let sortedArray = [];
  const halfIndex = Math.floor(array.length / 2);
  const firstHalfArray = mergeSort(array.slice(0, halfIndex));
  const secondHalfArray = mergeSort(array.slice(halfIndex));

  while (firstHalfArray.length !== 0 && secondHalfArray.length !== 0) {
    if (firstHalfArray[0] <= secondHalfArray[0]) {
      sortedArray.push(firstHalfArray.shift());
    } else {
      sortedArray.push(secondHalfArray.shift());
    }
  }

  if (firstHalfArray.length === 0) return [...sortedArray, ...secondHalfArray];
  else return [...sortedArray, ...firstHalfArray];
};
