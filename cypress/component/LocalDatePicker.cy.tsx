import LocaleDatePicker from "../../components/LocaleDatePicker";

const handleChangeDate = () => {};

const date = new Date().toLocaleDateString;

describe("<LocalDatePicker.cy.ts>", () => {
  it("mounts", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <LocaleDatePicker
        label={"Date"}
        date={""}
        handleDateChange={handleChangeDate}
      />
    );
  });
});
