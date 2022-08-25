import UserMenu from "../../components/UserMenu";

const handleLogout = () => {};

describe("<UserMenu.cy.tsx>", () => {
  it("mounts", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<UserMenu handleLogout={handleLogout} userName="Pepe" />);
  });
});
