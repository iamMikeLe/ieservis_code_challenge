import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

import { setMaintenance } from "../../store/generalSlice";
import { store } from "../../store/store";
import { setLoginForm } from "./loginSlice";

vi.mock("../../API/userAPI", () => ({
  apiRequest: vi.fn(),
  getMaintenanceStatus: vi.fn().mockResolvedValue({ status: "OK" }),
}));

describe("When not logged in", () => {
  beforeEach(async () => {
    store.dispatch(setLoginForm({ key: "email", value: "test@example.com" }));
    store.dispatch(setLoginForm({ key: "password", value: "123456Asd" }));

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/login"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });
  });

  test("input value reflects state update", () => {
    const emailInput = screen.getByLabelText(
      "Email address"
    ) as HTMLInputElement;
    expect(emailInput.value).toBe("test@example.com");
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    expect(passwordInput.value).toBe("123456Asd");
  });
});

describe("When under maintenance", () => {
  beforeEach(async () => {
    store.dispatch(setMaintenance(true));

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/login"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });
  });

  test("it should render maintenance component", () => {
    const maintenanceElement = screen.getByTestId("maintenance");
    expect(maintenanceElement).toBeInTheDocument();
  });

  test("it should disable email input", () => {
    const loginButton = screen.getByTestId("login-button");
    expect(loginButton).toBeDisabled();
  });

  test("it should disable password input", () => {
    const emailInput = screen.getByTestId("email-input");
    expect(emailInput).toBeDisabled();
  });

  test("it should disable login button", () => {
    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toBeDisabled();
  });
});
