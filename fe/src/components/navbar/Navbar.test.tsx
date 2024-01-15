import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  test("it renders Intro page on Home navigation click", async () => {
    fireEvent.click(screen.getByTestId("home-nav"));

    await waitFor(() => {
      const introPageElement = screen.getByTestId("intro");
      expect(introPageElement).toBeInTheDocument();
    });
  });

  test("it renders login page on Login navigation click", async () => {
    fireEvent.click(screen.getByTestId("login-nav"));

    await waitFor(() => {
      const loginPageElement = screen.getByTestId("login-page");
      expect(loginPageElement).toBeInTheDocument();
    });
  });

  test("it renders admin login page on Admin navigation click", async () => {
    fireEvent.click(screen.getByTestId("admin-login-nav"));

    await waitFor(() => {
      const adminLoginPageElement = screen.getByTestId("admin-login");
      expect(adminLoginPageElement).toBeInTheDocument();
    });
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
  test("it renders Intro page on Home navigation click", async () => {
    fireEvent.click(screen.getByTestId("home-nav"));

    await waitFor(() => {
      const introPageElement = screen.getByTestId("intro");
      expect(introPageElement).toBeInTheDocument();
    });
  });

  test("it renders images to pdf page on Converter navigation click", async () => {
    fireEvent.click(screen.getByTestId("converter-nav"));

    await waitFor(() => {
      const converterPageElement = screen.getByTestId("img-to-pdf-page");
      expect(converterPageElement).toBeInTheDocument();
    });
  });

  test("it renders login page on Logout navigation click", async () => {
    fireEvent.click(screen.getByTestId("logout"));

    await waitFor(() => {
      const loginPageElement = screen.getByTestId("login-page");
      expect(loginPageElement).toBeInTheDocument();
    });
  });
});

describe("When logged in as admin", () => {
  beforeEach(() => {
    store.dispatch(setUserData({ email: "test@email.com", type: "admin" }));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/images-to-pdf"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  });
  test("it renders Intro page on Home navigation click", async () => {
    fireEvent.click(screen.getByTestId("home-nav"));

    await waitFor(() => {
      const introPageElement = screen.getByTestId("intro");
      expect(introPageElement).toBeInTheDocument();
    });
  });

  test("it renders images to pdf page on Converter navigation click", async () => {
    fireEvent.click(screen.getByTestId("converter-nav"));

    await waitFor(() => {
      const converterPageElement = screen.getByTestId("img-to-pdf-page");
      expect(converterPageElement).toBeInTheDocument();
    });
  });

  test("it renders login page on Logout navigation click", async () => {
    fireEvent.click(screen.getByTestId("logout"));

    await waitFor(() => {
      const loginPageElement = screen.getByTestId("login-page");
      expect(loginPageElement).toBeInTheDocument();
    });
  });
});
