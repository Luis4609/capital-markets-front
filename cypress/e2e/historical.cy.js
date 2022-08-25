/// <reference types="cypress" />

describe("historical page"),
  () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/historical/EUR/USD");
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
  };
