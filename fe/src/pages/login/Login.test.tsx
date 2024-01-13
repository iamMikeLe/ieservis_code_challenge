import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

import { store } from "../../store/store";
import { setMealForm } from "./loginSlice";

test("input value reflects state update", () => {
  store.dispatch(setMealForm({ key: "email", value: "test@example.com" }));
  store.dispatch(setMealForm({ key: "password", value: "123456Asd" }));

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const emailInput = screen.getByLabelText("Email address") as HTMLInputElement;
  expect(emailInput.value).toBe("test@example.com");
  const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
  expect(passwordInput.value).toBe("123456Asd");
});
