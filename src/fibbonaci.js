const fibs = function (length) {
  const sequence = [];

  for (let i = 0; i < length; i++) {
    if (i <= 1) sequence.push(i);
    else {
      sequence.push(sequence[i - 2] + sequence[i - 1]);
    }
  }

  return sequence;
};

const fibsRec = function (length) {
  if (length === 1) return [0];
  else if (length === 2) return [0, 1];

  for (let i = length; i > 2; i--) {
    const sequence = fibsRec(i - 1);

    return [...sequence, sequence[i - 3] + sequence[i - 2]];
  }
};

export { fibs, fibsRec };
