const arr = [1, 17, 16, 4, 29, 13, 87, 57, 67, 14, 34, 15, 8, 3, 19];
const sortedArr = arr.sort((a, b) => a - b);

const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};

const bubbleSort = (arr) => {
  let swapped = true;
  let unsortedUntilIndex = arr.length - 1;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < unsortedUntilIndex; i += 1) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    unsortedUntilIndex -= 1;
  }
  return arr;
};

const bubbleSort2 = (items) => {
  for (let limit = items.length - 1; limit > 0; limit -= 1) {
    for (let i = 0; i < limit; i += 1) {
      if (items[i] > items[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }
};

const selectionSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i += 1) {
    let minIndex = i;
    for (let j = minIndex + 1; j < arr.length; j += 1) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
};

// Сортировка вставками
const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i += 1) {
    const temp = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j -= 1;
    }
    arr[j + 1] = temp;
  }
  return arr;
};

// Быстрая сортировками с функцией-компаратором
function firstLesser(a, b) {
  return a < b;
}

function firstGreater(a, b) {
  return a > b;
}

function partition(items, left, right, pivot, compareFunc) {
  while (true) {
    while (compareFunc(items[left], pivot)) {
      left += 1;
    }

    while (compareFunc(pivot, items[right])) {
      right -= 1;
    }

    if (left >= right) {
      return right + 1;
    }

    const temporary = items[left];
    items[left] = items[right];
    items[right] = temporary;

    left += 1;
    right -= 1;
  }
}

function sort(items, left, right, compareFunc) {
  const length = right - left + 1;

  if (length < 2) {
    return;
  }

  const pivot = items[left];

  const splitIndex = partition(items, left, right, pivot, compareFunc);
  sort(items, left, splitIndex - 1, compareFunc);
  sort(items, splitIndex, right, compareFunc);
}

function quickSort2(arr, order = "asc") {
  const items = [...arr];
  if (order === "asc") {
    sort(items, 0, items.length - 1, firstLesser);
  } else if (order === "desc") {
    sort(items, 0, items.length - 1, firstGreater);
  }
  return items;
}

// Из Хекслета
const quickSort = (items) => {
  if (items.length === 0) {
    return [];
  }

  const index = Math.floor(items.length / 2);
  const pivot = items[index];

  const smallerElems = [];
  const biggerElems = [];

  for (let i = 0; i < items.length; i += 1) {
    if (i === index) {
      continue;
    }
    const current = items[i];
    if (current < pivot) {
      smallerElems.push(current);
    } else {
      biggerElems.push(current);
    }
  }

  const sortedSmallerElems = quickSort(smallerElems);
  const sortedBiggerElems = quickSort(biggerElems);

  return [...sortedSmallerElems, pivot, ...sortedBiggerElems];
};

const items = [10, 20, 0, -1];
const result = quickSort(items, "desc");
console.log(result);
