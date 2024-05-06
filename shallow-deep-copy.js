let obj = {
  a: 5,
  nestedObject: {
    b: 10,
  },
};

//let copy = {...obj} // it will copy the first level elem

// let copy = JSON.parse(JSON.stringify(obj));

// copy.nestedObject.b = 20;

// console.log(obj, copy);

// custom deep copy
function deepCopy(obj) {
  if (typeof obj !== "object") {
    return "please pass object";
  }
  let mainObj = {};
  for (let key in obj) {
    const value = obj[key];
    if (typeof value !== "object") {
      mainObj = { ...mainObj, [key]: value };
    } else {
      mainObj = { ...mainObj, [key]: { ...value } };
    }
  }

  return mainObj;
}

const copy = deepCopy(obj);
copy.nestedObject.b = 20;
console.log(obj , copy);
