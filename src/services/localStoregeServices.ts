export const save = (state: boolean) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem("logIn", JSON.stringify(serializedState));
  } catch {
    // ignore write errors
  }
};

export const loadBoolean = () => {
  try {
    const serializedState = localStorage.getItem("logIn");

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
