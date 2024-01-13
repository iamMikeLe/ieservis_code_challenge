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

test("Redirects to login page on /", () => {
  renderWithStoreAndRouter({ type: "" }, "/");
  const loginElement = screen.getByTestId("login-page");
  expect(loginElement).toBeInTheDocument();
});

test("renders Admin login page on /admin/login", () => {
  renderWithStoreAndRouter({ type: "" }, "/admin/login");
  const loginElement = screen.getByTestId("admin-login");
  expect(loginElement).toBeInTheDocument();
});

test("renders login page on /login route", () => {
  renderWithStoreAndRouter({ type: "" }, "/login");
  const loginElement = screen.getByTestId("login-page");
  expect(loginElement).toBeInTheDocument();
});

test("renders ImgToPdf page on /images-to-pdf route when userData.type exists", () => {
  renderWithStoreAndRouter({ type: "user" }, "/images-to-pdf");
  const loginElement = screen.getByTestId("img-to-pdf-page");
  expect(loginElement).toBeInTheDocument();
});

test("renders error page on invalid route", () => {
  renderWithStoreAndRouter({ type: "user" }, "/someInvalid-route");
  const loginElement = screen.getByTestId("error-page");
  expect(loginElement).toBeInTheDocument();
});
