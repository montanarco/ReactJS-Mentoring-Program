describe('MovieListPage End-to-End Tests', () => {
    beforeEach(() => {
      cy.visit('/movie-list-page'); 
    });
  
    it('should load the first page with no initial parameters', () => {

      cy.wait(2000); 
  
      // Verify the movies grid gets populated
      cy.get('.movie-grid').should('be.visible'); 
    });
  
    it('should allow filtering movies by genre', () => {
      // Select a genre: "Comedy" 
      cy.get('.genre-button').contains('Comedy').click();
      cy.get('.genre-button.selected').should('have.text', 'Comedy');
  
      // Verify that the movies grid updates to show Comedy movies
      cy.get('.movie-tile')
        .each(($el) => {
          cy.wrap($el).find('.movie-genres').should('contain', 'Comedy'); 
        });
  
      cy.url().should('include', 'genre=Comedy');
    });
  
    it('should sort movies by a different criteria when SortControl is used', () => {
        // Select "Release Date" from the dropdown
        cy.get('.sort-select').select('release_date'); // Use the value of the option here
        
        cy.get('.movie-tile').should(($items) => {
          // Validate if the movies are sorted correctly by release date
          const sortedDates = $items
            .map((i, el) => Cypress.$(el).find('.movie-release-date').text())
            .get();
      
          expect(sortedDates).to.deep.equal([...sortedDates].sort((a, b) => new Date(b) - new Date(a)));
        });
      
        cy.url().should('include', 'sortBy=release_date');
      });
  
      it('should search for movies using the SearchForm', () => {
        // Type a search query (e.g., "Inception") and submit the form
        cy.get('#search').type('Inception'); 
        cy.get('.search-button').click();
      
        cy.get('.movie-tile', { timeout: 10000 }).should(($items) => {
          // Assert that at least one movie contains the word "Inception" in its title
          const movieTitles = $items.map((i, el) => Cypress.$(el).find('.movie-name').text()).get();
          expect(movieTitles.some((title) => title.toLowerCase().includes('inception'))).to.be.true;
        });
      
        cy.url().should('include', 'search=Inception');
      });
  
      it('should handle pagination correctly', () => {
        cy.get('#prev').should('be.disabled');
      
        cy.get('.pagination-buttons span').should('have.text', 'Page 1');
      
        cy.get('#next').click();
      
        cy.get('#prev').should('not.be.disabled');
      
        cy.get('.pagination-buttons span').should('have.text', 'Page 2');
      
        cy.get('.movie-tile').should(($items) => {
          expect($items).to.have.length(9); 
        });
      
        cy.url().should('include', 'page=2');
      
        cy.get('#prev').click();
      
        cy.get('.movie-tile').should(($items) => {
          expect($items).to.have.length(9); // Assuming 9 items per page
        });
      
        cy.url().should('include', 'page=1');
      
        cy.get('#prev').should('be.disabled');
      });
  
      it('should show and close movie details when a movie is clicked', () => {
        // Ensure the movie tile exists and click the first one
        cy.get('.movie-tile').first().as('selectedMovie'); // Alias the movie tile
        cy.get('@selectedMovie').should('exist').click();
        cy.get('.movie-details').first().as('movieDetails'); // Alias the movie details
        cy.get('@movieDetails').should('exist').click(); // Ensure it exists and click
      
        // Verify that the MovieDetails component is displayed
        cy.get('.movie-details-container', { timeout: 10000 })
          .should('exist')
          .and('be.visible');
      
        // Validate the title inside the MovieDetails component
        cy.get('.movie-title').should('have.text', 'Fifty Shades Freed'); // Match the movie title text
      
        // Close the MovieDetails view
        cy.get('#movie-info-close').should('exist').click();
      
        // Verify that the MovieDetails component disappears
        cy.get('.movie-details-container').should('not.exist');
      });   
  });