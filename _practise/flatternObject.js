const obj = {
  name: "xyz",
  student: {
    john: {
        john2: "abc"
    },
  },
};

const result = {};
const key = [];

const flatObj = (obj) => {
  for (let i in obj) {
    const elem = obj[i];
    if (typeof elem === "object") {
      key.push(i);
      flatObj(elem);
    } else {
      if (key.length > 0) {
        result[`${key.join('.')}.${i}`] = elem;
      }else{
        result[i] = elem;
      }
    }
    key.length = 0
  }
};

flatObj(obj);

console.log('result->',result);
