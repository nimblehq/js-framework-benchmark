import Index from "../routes/_index";
import { render } from "@testing-library/react";

describe("Test Root route", () => {
  test("renders Welcome Page", () => {
    const { getByText } = render(<Index />);
    expect(getByText("Welcome to Remix")).toBeInTheDocument();
  });
});
