export const task1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task 1 completed successfully");
    }, 1000);
  });
};

export const task2 = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Task 2 failed"));
    }, 2000);
  });
};

export const task3 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task 3 completed successfully");
    }, 3000);
  });
};

export const task4 = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Task 4 failed"));
    }, 2500);
  });
};

export const handleAll = (
  promises: Promise<unknown>[] = [task1(), task2(), task3(), task4()]
) => {
  Promise.all([...promises])
    .then((values) => {
      console.log("data>>>", values);
    })
    .catch((error) => {
      console.log("error>>>", error);
    })
    .finally(() => console.log("all settled>>>"));
};

//

export const handleAllSettled = (
  promises: Promise<unknown>[] = [task1(), task2(), task3(), task4()]
) => {
  Promise.allSettled([...promises])
    .then((values) => {
      console.log("data>>>", values);
    })
    .catch((error) => {
      console.log("error>>>", error);
    })
    .finally(() => console.log("all settled>>>"));
};

export const handleRace = (
  promises: Promise<unknown>[] = [task2(), task3(), task4()]
) => {
  Promise.race([...promises])
    .then((values) => {
      console.log("data>>>", values);
    })
    .catch((error) => {
      console.log("error>>>", error);
    })
    .finally(() => console.log("all settled>>>"));
};

export const handleAny = (
  promises: Promise<unknown>[] = [task2(), task3(), task4()]
) => {
  Promise.any([...promises])
    .then((values) => {
      console.log("data>>>", values);
    })
    .catch((error) => {
      console.log("error>>>", error);
    })
    .finally(() => console.log("all settled>>>"));
};
