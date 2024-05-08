let arr = [1, 2, 3, [4, [5]], 6];
let flatArray = [];

const flattenArray = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let elem = arr[i];
    if (Array.isArray(elem)) {
      flattenArray(elem);
    } else {
        flatArray.push(elem);
    }
  }
  return flatArray;
};

const result = flattenArray(arr);

console.log(result)
