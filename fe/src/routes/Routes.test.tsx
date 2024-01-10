import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

test("renders Admin login page on /admin/login", () => {
  render(
    <MemoryRouter initialEntries={["/admin/login"]}>
      <App />
    </MemoryRouter>
  );

  const loginElement = screen.getByTestId("admin-login");
  expect(loginElement).toBeInTheDocument();
});

// ------------------------------

test("renders login page on /login", () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );

  const loginElement = screen.getByTestId("login-page");
  expect(loginElement).toBeInTheDocument();
});

// ------------------------------

test("Redirects to login page on /", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const loginElement = screen.getByTestId("login-page");
  expect(loginElement).toBeInTheDocument();
});

// ------------------------------

test("renders ImgToPdf page on /images-to-pdf", () => {
  render(
    <MemoryRouter initialEntries={["/images-to-pdf"]}>
      <App />
    </MemoryRouter>
  );

  const loginElement = screen.getByTestId("img-to-pdf-page");
  expect(loginElement).toBeInTheDocument();
});

// ------------------------------

test("renders error page on invalid route", () => {
  render(
    <MemoryRouter initialEntries={["/someInvalid-route"]}>
      <App />
    </MemoryRouter>
  );

  const loginElement = screen.getByTestId("error-page");
  expect(loginElement).toBeInTheDocument();
});
