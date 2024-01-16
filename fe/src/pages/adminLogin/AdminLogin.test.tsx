import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

import { store } from "../../store/store";
import { setAdminLoginForm } from "./adminLoginSlice";

vi.mock("../../API/userAPI", () => ({
  apiRequest: vi.fn(),
  getMaintenanceStatus: vi.fn().mockResolvedValue({
    maintenance: false,
    maxImagesToConvert: 5,
  }),
}));

describe("When not logged in", () => {
  beforeEach(async () => {
    store.dispatch(
      setAdminLoginForm({ key: "email", value: "test@example.com" })
    );
    store.dispatch(setAdminLoginForm({ key: "password", value: "123456Asd" }));

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/admin/login"]}>
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
