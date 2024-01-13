import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import App from "../App";

const mockStore = configureMockStore();
const store = mockStore({
  general: {
    userData: {},
  },
  login: {
    loginFormValues: {
      email: "",
      password: "",
    },
  },
});

function customRender(ui: React.ReactElement, { route = "/" } = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper });
}

// ------------------------------

test("renders Admin login page on /admin/login", () => {
  customRender(<App />, { route: "/admin/login" });

  const loginElement = screen.getByTestId("admin-login");
  expect(loginElement).toBeInTheDocument();
});

// ------------------------------

test("renders login page on /login", () => {
  customRender(<App />, { route: "/login" });

  const loginElement = screen.getByTestId("login-page");
  expect(loginElement).toBeInTheDocument();
});

// ------------------------------

test("Redirects to login page on /", () => {
  customRender(<App />, { route: "/" });

  const loginElement = screen.getByTestId("login-page");
  expect(loginElement).toBeInTheDocument();
});

// ------------------------------

test("renders ImgToPdf page on /images-to-pdf", () => {
  const store = mockStore({
    general: {
      userData: {
        type: "user",
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/images-to-pdf"]}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const loginElement = screen.getByTestId("img-to-pdf-page");
  expect(loginElement).toBeInTheDocument();
});

// ------------------------------

test("renders error page on invalid route", () => {
  const store = mockStore({
    general: {
      userData: {
        type: "user",
      },
    },
  });
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/someInvalid-route"]}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const loginElement = screen.getByTestId("error-page");
  expect(loginElement).toBeInTheDocument();
});
