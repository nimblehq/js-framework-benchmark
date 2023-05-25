import { render } from "@testing-library/react";

import Index from "../routes/_index";

describe("Root Route", () => {
  test("renders Welcome Page", () => {
    const { getByText } = render(<Index />);
    expect(getByText("Welcome to Remix")).toBeInTheDocument();
  });
});
