import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import App from "../App";

const mockStore = configureStore([]);

vi.mock("../API/userAPI", () => ({
  apiRequest: vi.fn(),
  getMaintenanceStatus: vi.fn().mockResolvedValue({ status: "OK" }),
}));

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
        type: "user",
      },
    },
    adminLogin: {
      adminLoginFormValues: {
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

describe("When not logged in", () => {
  test("it renders intro page on / route", () => {
    renderWithStoreAndRouter({ type: "" }, "/");
    const introPageDiv = screen.getByTestId("intro");
    expect(introPageDiv).toBeInTheDocument();
  });

  test("it renders login page on /login route", () => {
    renderWithStoreAndRouter({ type: "" }, "/login");
    const loginPageDiv = screen.getByTestId("login-page");
    expect(loginPageDiv).toBeInTheDocument();
  });

  test("it renders Admin login page on /admin/login route", () => {
    renderWithStoreAndRouter({ type: "" }, "/admin/login");
    const adminLoginPageDiv = screen.getByTestId("admin-login");
    expect(adminLoginPageDiv).toBeInTheDocument();
  });

  test("it renders login page on /images-to-pdf route", () => {
    renderWithStoreAndRouter({ type: "" }, "/images-to-pdf");
    const loginPageDiv = screen.getByTestId("login-page");
    expect(loginPageDiv).toBeInTheDocument();
  });

  test("it renders login page on invalid route", () => {
    renderWithStoreAndRouter({ type: "" }, "/someInvalid-route");
    const loginPageDiv = screen.getByTestId("login-page");
    expect(loginPageDiv).toBeInTheDocument();
  });
});

describe("When logged in as user", () => {
  test("it renders intro page on / route", () => {
    renderWithStoreAndRouter({ type: "user" }, "/");
    const introPageDiv = screen.getByTestId("intro");
    expect(introPageDiv).toBeInTheDocument();
  });

  test("it renders images-to-pdf page on /login route", () => {
    renderWithStoreAndRouter({ type: "user" }, "/login");
    const converterPageDiv = screen.getByTestId("img-to-pdf-page");
    expect(converterPageDiv).toBeInTheDocument();
  });

  test("it renders Admin login page on /admin/login route", () => {
    renderWithStoreAndRouter({ type: "user" }, "/admin/login");
    const adminLoginPageDiv = screen.getByTestId("admin-login");
    expect(adminLoginPageDiv).toBeInTheDocument();
  });

  test("it renders images-to-pdf page on /images-to-pdf route", () => {
    renderWithStoreAndRouter({ type: "user" }, "/images-to-pdf");
    const converterPageDiv = screen.getByTestId("img-to-pdf-page");
    expect(converterPageDiv).toBeInTheDocument();
  });

  test("it renders error page on invalid route", () => {
    renderWithStoreAndRouter({ type: "user" }, "/someInvalid-route");
    const errorPageDiv = screen.getByTestId("error-page");
    expect(errorPageDiv).toBeInTheDocument();
  });
});

describe("When logged in as admin", () => {
  test("it renders intro page on / route", () => {
    renderWithStoreAndRouter({ type: "admin" }, "/");
    const introPageDiv = screen.getByTestId("intro");
    expect(introPageDiv).toBeInTheDocument();
  });

  test("it renders images-to-pdf page on /login route", () => {
    renderWithStoreAndRouter({ type: "admin" }, "/login");
    const converterPageDiv = screen.getByTestId("img-to-pdf-page");
    expect(converterPageDiv).toBeInTheDocument();
  });

  test("it renders images-to-pdf page on /admin/login route", () => {
    renderWithStoreAndRouter({ type: "admin" }, "/admin/login");
    const converterPageDiv = screen.getByTestId("img-to-pdf-page");
    expect(converterPageDiv).toBeInTheDocument();
  });

  test("it renders images-to-pdf page on /images-to-pdf route", () => {
    renderWithStoreAndRouter({ type: "admin" }, "/images-to-pdf");
    const converterPageDiv = screen.getByTestId("img-to-pdf-page");
    expect(converterPageDiv).toBeInTheDocument();
  });

  test("it renders error page on invalid route", () => {
    renderWithStoreAndRouter({ type: "admin" }, "/someInvalid-route");
    const errorPageDiv = screen.getByTestId("error-page");
    expect(errorPageDiv).toBeInTheDocument();
  });
});
