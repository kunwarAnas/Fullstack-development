const arr = ["a", "b", "b", "b", "b", "b", "b", "c", "d", "d", "d"];
const countObj = {};
let max = {
  elem: "",
  count: 0,
};

for (let i = 0; i < arr.length; i++) {
  const elem = arr[i];
  countObj[elem] = countObj[elem] ? countObj[elem] + 1 : 1;
  if(max.count < countObj[elem]){
    max.elem = elem;
    max.count = countObj[elem]
  }
}

console.log(max);
