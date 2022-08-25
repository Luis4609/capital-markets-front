import Navbar from "../../components/Navbar";

const handleChangeDate = () => {};

const date = new Date().toLocaleDateString;

describe("<Navbar.cy.tsx>", () => {
  it("mounts", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<Navbar />);
  });
});
