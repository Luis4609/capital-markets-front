/// <reference types="cypress" />

describe("converter app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays four items in the navbar", () => {
    cy.get(
      ".MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-1r339ym-MuiToolbar-root"
    ).should("have.length", 1);

    cy.get(".todo-list li").first().should("have.text", "Capital Markets");
    cy.get(".todo-list li").last().should("have.text", "Login");
    cy.get(".todo-list li").find(2).should("have.text", "Converter");
    cy.get(".todo-list li").find(2).should("have.text", "Historical");
  });

  it("check title in index page", () => {
    // We'll store our item text in a variable so we can reuse it
    const newItem = "Feed the cat";

    cy.get(
      ".MuiTypography-root MuiTypography-button MuiLink-root MuiLink-underlineNone css-1j0el59-MuiTypography-root-MuiLink-root"
    ).should("have.text", "Capital Markets");

    cy.get(".todo-list li")
      .should("have.length", 3)
      .last()
      .should("have.text", newItem);
  });

  it("can check off an item as completed", () => {
    cy.contains("Pay electric bill")
      .parent()
      .find("input[type=checkbox]")
      .check();

    cy.contains("Pay electric bill")
      .parents("li")
      .should("have.class", "completed");
  });

  context("with a checked task", () => {
    beforeEach(() => {
      cy.contains("Pay electric bill")
        .parent()
        .find("input[type=checkbox]")
        .check();
    });

    it("can filter for uncompleted tasks", () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      cy.contains("Active").click();

      // After filtering, we can assert that there is only the one
      // incomplete item in the list.
      cy.get(".todo-list li")
        .should("have.length", 1)
        .first()
        .should("have.text", "Walk the dog");

      // For good measure, let's also assert that the task we checked off
      // does not exist on the page.
      cy.contains("Pay electric bill").should("not.exist");
    });

    it("can filter for completed tasks", () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      cy.contains("Completed").click();

      cy.get(".todo-list li")
        .should("have.length", 1)
        .first()
        .should("have.text", "Pay electric bill");

      cy.contains("Walk the dog").should("not.exist");
    });

    it("can delete all completed tasks", () => {
      cy.contains("Clear completed").click();

      // Then we can make sure that there is only one element
      // in the list and our element does not exist
      cy.get(".todo-list li")
        .should("have.length", 1)
        .should("not.have.text", "Pay electric bill");

      // Finally, make sure that the clear button no longer exists.
      cy.contains("Clear completed").should("not.exist");
    });
  });
});
