import { Provider } from "react-redux";

import { store } from "../store.ts";

import { Router } from "./router/router.tsx";

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
