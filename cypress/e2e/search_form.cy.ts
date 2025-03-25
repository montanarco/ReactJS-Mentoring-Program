/// <reference types="cypress" />

describe("SearchForm End-to-End Tests", () => {
    beforeEach(() => {
      // Visit the page where the SearchForm component is rendered
      // Replace '/core-concepts' with the URL or route where the component is rendered
      cy.visit("/core-concepts");
    });
  
    it("should render the search form properly", () => {
      // Check if the input field is visible
      cy.get(".search-input").should("be.visible");
  
      // Check if the button is visible
      cy.get(".search-button").should("be.visible");
    });
  
    it("should update the input value when typing", () => {
      // Type in the input field and verify the value
      const searchTerm = "Inception";
      cy.get(".search-input").type(searchTerm);
      cy.get(".search-input").should("have.value", searchTerm);
    });
  
    it("should trigger the search function when Enter is pressed", () => {
      const searchTerm = "Inception";
  
      // Spy on the search function
      cy.intercept("POST", "/search", (req) => {
        // Check request body or params if needed
        expect(req.body.searchCriteria).to.equal(searchTerm);
      });
  
      // Type into the input field and press Enter
      cy.get(".search-input").type(`${searchTerm}{enter}`);
    });
  
    it("should trigger the search function when clicking the button", () => {
      // Spy on the search function or intercept the network request
      const searchTerm = "Avengers";
      cy.intercept("POST", "/search", (req) => {
        // Here we can confirm that the search criteria was submitted
        expect(req.body.searchCriteria).to.equal(searchTerm);
      });
  
      // Type into the input field
      cy.get(".search-input").type(searchTerm);
  
      // Click the search button
      cy.get(".search-button").click();
    });
  
    it("should invoke search automatically when the input gains focus", () => {
      const searchTerm = "Matrix";
  
      // Stub or intercept the search request
      cy.intercept("POST", "/search", (req) => {
        expect(req.body.searchCriteria).to.equal(searchTerm);
      });
  
      // Type in the input field and check onFocus
      cy.get(".search-input").type(searchTerm).focus();
    });
  });