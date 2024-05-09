let cacheObj = {};

const add = (a, b) => {
  return a + b;
};

const substract = (a, b) => {
  return a - b;
};

const calculate = (a, b, operation) => {
  const key = `${a + "-" + b}-${operation}`;
  if (cacheObj[key]) {
    console.log("served from cache");
    return cacheObj[key];
  }

  let result;

  if (operation === "a") {
    result = add(a, b);
  }

  if (operation === "s") {
    result = substract(a, b);
  }

  cacheObj[key] = result;

  return result

};


calculate()
