export function arrayRemove(arr, value) { return arr.filter((ele) => ele !== value); }
export const dummy = '';

export function sortyBy3rdItemAsc(a, b) {
  if (a[2] < b[2]) {
    return -1;
  }
  return 1;
}
export function sortyBy3rdItemDesc(a, b) {
  if (a[2] < b[2]) {
    return 1;
  }
  return -1;
}

export function uniqeArr(a) {
  return a.sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1]);
}

// remove dublicates of 4th item
export function uniqArr4(a) {
  return a.sort().filter((item, pos, ary) => !pos || item[3] !== ary[pos - 1][3]);
}

// remove dublicates of 3rd item
export function uniqArr3(a) {
  return a.sort().filter((item, pos, ary) => !pos || item[2].toString()
  !== ary[pos - 1][2].toString());
}

export function uniqArr1(a) {
  return a.sort().filter((item, pos, ary) => !pos || item[0] !== ary[pos - 1][0]);
}

export const removeArrEntryBy4thItem = (arr, item) => {
  let output = [];
  if (arr.length && item) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][3].toString() !== item.toString()) {
        output = output.concat([arr[i]]);
      }
    }
  }
  return output;
};

export const removeArrEntryBy3rdItem = (arr, item) => {
  let output = [];
  if (arr.length && item) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][2].toString() !== item.toString()) {
        output = output.concat([arr[i]]);
      }
    }
  }
  return output;
};
