import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import App from "../App";

const mockStore = configureStore([]);

function renderWithStoreAndRouter(
  userData: { type: string },
  initialRoute: string
) {
  const store = mockStore({
    general: {
      userData,
    },
    login: {
      loginFormValues: {
        email: "",
        password: "",
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
}

describe("Route tests while not logged in", () => {
  test("renders intro page on / route", () => {
    renderWithStoreAndRouter({ type: "" }, "/");
    const loginElement = screen.getByTestId("intro");
    expect(loginElement).toBeInTheDocument();
  });

  test("renders login page on /login route", () => {
    renderWithStoreAndRouter({ type: "" }, "/login");
    const loginElement = screen.getByTestId("login-page");
    expect(loginElement).toBeInTheDocument();
  });

  test("renders Admin login page on /admin/login route", () => {
    renderWithStoreAndRouter({ type: "" }, "/admin/login");
    const loginElement = screen.getByTestId("admin-login");
    expect(loginElement).toBeInTheDocument();
  });

  test("renders login page on /images-to-pdf route", () => {
    renderWithStoreAndRouter({ type: "" }, "/images-to-pdf");
    const loginElement = screen.getByTestId("login-page");
    expect(loginElement).toBeInTheDocument();
  });

  test("renders login page on invalid route", () => {
    renderWithStoreAndRouter({ type: "" }, "/someInvalid-route");
    const loginElement = screen.getByTestId("login-page");
    expect(loginElement).toBeInTheDocument();
  });
});

describe("Route tests while logged in as user", () => {
  test("renders intro page on / route", () => {
    renderWithStoreAndRouter({ type: "user" }, "/");
    const loginElement = screen.getByTestId("intro");
    expect(loginElement).toBeInTheDocument();
  });

  test("renders images-to-pdf page on /login route", () => {
    renderWithStoreAndRouter({ type: "user" }, "/login");
    const loginElement = screen.getByTestId("img-to-pdf-page");
    expect(loginElement).toBeInTheDocument();
  });

  test("renders Admin login page on /admin/login route", () => {
    renderWithStoreAndRouter({ type: "user" }, "/admin/login");
    const loginElement = screen.getByTestId("admin-login");
    expect(loginElement).toBeInTheDocument();
  });

  test("renders images-to-pdf page on /images-to-pdf route", () => {
    renderWithStoreAndRouter({ type: "user" }, "/images-to-pdf");
    const loginElement = screen.getByTestId("img-to-pdf-page");
    expect(loginElement).toBeInTheDocument();
  });

  test("renders error page on invalid route", () => {
    renderWithStoreAndRouter({ type: "user" }, "/someInvalid-route");
    const loginElement = screen.getByTestId("error-page");
    expect(loginElement).toBeInTheDocument();
  });
});
