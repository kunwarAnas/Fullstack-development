const newPromise = new Promise((res, _) => {
  setTimeout(() => {
    res("promise is resolved");
  }, 2000);
});

(async () => {
  console.log(newPromise);
  const result = await newPromise;
  console.log(result)
})();
