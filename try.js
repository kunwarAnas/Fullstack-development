

const setupEventListener = () => {
  let clicks = 0;

  document.getElementById("clickMe").addEventListener("click", () => {
    clicks++;
    console.log(`Button clicked ${clicks} times`);
  });
};

setupEventListener();
