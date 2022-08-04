import { render, screen, within } from "@testing-library/react";
import { expect, test, it } from "vitest";
import Home from "../pages";

test("home", () => {
  render(<Home />);
  const main = within(screen.getByRole("main"));
  expect(
    main.getByRole("heading", { level: 1, name: /Capital Markets/i })
  ).toBeDefined();

  //check footer to have img . alt: Vercel Logo
  const footer = within(screen.getByRole("contentinfo"));
  const link = within(footer.getByRole("link"));
  expect(link.getByRole("img", { name: /vercel logo/i })).toBeDefined();
});

it("renders correctly", () => {
  const result = render(<Home />);
  expect(result).toMatchSnapshot();
});
