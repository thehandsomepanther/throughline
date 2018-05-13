onmessage = (e) => {
  let data = e.data[0];
  let workerResult = null;
  (() => {
    var e = null; // remove "e"
    workerResult = eval(data);
  })();

  self.postMessage(workerResult);
};
