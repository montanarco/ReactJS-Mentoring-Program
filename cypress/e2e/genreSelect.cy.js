describe('GenreSelect Component Tests', () => {
  beforeEach(() => {
    cy.visit('/core-concepts');
  });

  it('should mark a genre button as selected when clicked', () => {
    // Selectors for GenreSelect buttons
    const genreButtonsSelector = '.genre-button'; 

    // Step 1: Assert that the initial genre is correctly marked as selected
    cy.get(`${genreButtonsSelector}.selected`).should('have.text', 'Action');

    // Step 2: Click on another genre (e.g., "Comedy") and verify it becomes selected
    cy.contains(genreButtonsSelector, 'Comedy').click(); // Click the 'Comedy' button

    // Step 3: Verify the new selected genre
    cy.get(`${genreButtonsSelector}.selected`).should('have.text', 'Comedy');

    // Step 4: Verify the previously selected button ('Action') no longer has the 'selected' class
    cy.contains(genreButtonsSelector, 'Action').should('not.have.class', 'selected');

    cy.contains(genreButtonsSelector, 'Western').click(); // Click the 'Comedy' button

    cy.get(`${genreButtonsSelector}.selected`).should('have.text', 'Western');

    cy.contains(genreButtonsSelector, 'Comedy').should('not.have.class', 'selected');
  });
});