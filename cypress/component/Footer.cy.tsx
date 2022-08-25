import Footer from "../../components/Footer";

describe("<Footer.cy.tsx>", () => {
  it("mounts", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<Footer />);
  });
});
