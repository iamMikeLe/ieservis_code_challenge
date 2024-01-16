import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import ImgToPdf from "./index";

const mockStore = configureStore([]);
describe("When logged in as admin", () => {
  test("It renders AdminSettings component", () => {
    const store = mockStore({
      general: {
        userData: {
          type: "admin",
        },
      },
    });

    render(
      <Provider store={store}>
        <ImgToPdf />
      </Provider>
    );

    const adminSettingsElement = screen.getByTestId("admin-settings");
    expect(adminSettingsElement).toBeInTheDocument();
  });
});

describe("When logged in as user", () => {
  test("It will not renders AdminSettings component", () => {
    const store = mockStore({
      general: {
        userData: {
          type: "user",
        },
      },
    });

    render(
      <Provider store={store}>
        <ImgToPdf />
      </Provider>
    );

    const adminSettingsElement = screen.queryByTestId("admin-settings");
    expect(adminSettingsElement).not.toBeInTheDocument();
  });
});
