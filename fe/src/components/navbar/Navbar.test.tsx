import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import App from "../../App";
import { setUserData } from "../../store/generalSlice";
import { store } from "../../store/store";

vi.mock("../../API/userAPI", () => ({
  apiRequest: vi.fn(),
  getMaintenanceStatus: vi.fn().mockResolvedValue({ status: "OK" }),
}));

describe("When not logged in", () => {
  beforeEach(async () => {
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

  test("it renders Intro page on Home navigation click", () => {
    fireEvent.click(screen.getByTestId("home-nav"));

    const introPageDiv = screen.getByTestId("intro");
    expect(introPageDiv).toBeInTheDocument();
  });

  test("it renders login page on Login navigation click", () => {
    fireEvent.click(screen.getByTestId("login-nav"));
    const loginPageDiv = screen.getByTestId("login-page");
    expect(loginPageDiv).toBeInTheDocument();
  });

  test("it renders admin login page on Admin navigation click", () => {
    fireEvent.click(screen.getByTestId("admin-login-nav"));
    const adminLoginPageDiv = screen.getByTestId("admin-login");
    expect(adminLoginPageDiv).toBeInTheDocument();
  });
});

describe("When logged in as user", () => {
  beforeEach(() => {
    store.dispatch(setUserData({ email: "test@email.com", type: "user" }));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/images-to-pdf"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  });
  test("it renders Intro page on Home navigation click", () => {
    fireEvent.click(screen.getByTestId("home-nav"));
    const introPageDiv = screen.getByTestId("intro");
    expect(introPageDiv).toBeInTheDocument();
  });

  test("it renders images to pdf page on Converter navigation click", () => {
    fireEvent.click(screen.getByTestId("converter-nav"));
    const converterPageDiv = screen.getByTestId("img-to-pdf-page");
    expect(converterPageDiv).toBeInTheDocument();
  });

  test("it renders login page on Logout navigation click", () => {
    fireEvent.click(screen.getByTestId("logout"));
    const loginPageDiv = screen.getByTestId("login-page");
    expect(loginPageDiv).toBeInTheDocument();
  });
});
