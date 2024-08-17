// New Implementation
Promise.prototype.then = async function (success, failed) {
  if (typeof success === "undefined") {
    try {
      const result = await this;
      return result;
    } catch (error) {
      return failed(error);
    }
  }
  const result = await this;
  return await success(result);
};

// DEMO
const a = new Promise((res, rej) => {
  setTimeout(() => {
    res(1);
  }, 1000);
});
a.then((data) => {
  console.log(data);
  return 2;
})
  .then((data) => {
    console.log(data);
  })
  .then(async (data) => {
    console.log(data);
    const a = await new Promise((res, rej) => {
      setTimeout(() => {
        res(3);
      }, 1000);
    });
    throw new Error("1st error");
    return a;
  })
  .then(() => {
    console.log("I am not printed");
  })
  .catch((err) => {
    console.log(err, "catch 1");
    return 3;
  })
  .then((data) => {
    console.log(data);
    return { name: "tin" };
  })
  .then((data) => {
    console.log(data);
    throw new Error("2nd error");
  })
  .then(() => {
    console.log("I am not printed either");
  })
  .catch((err) => {
    console.log(err, "catch 2");
  });
