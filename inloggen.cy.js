///inloggen

describe('Inloggen', () => {
  it('inloggen als Melvin', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('button.login__account').contains('Melvin').click();

    cy.url().should('not.include', '/login');
    cy.get('.sidenav').should('be.visible');
  });

  it('inloggen als Sara', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('button.login__account').contains('Sara').click();

    cy.url().should('not.include', '/login');
    cy.get('.sidenav').should('be.visible');
  });

  it('na inloggen kom je op de juiste pagina terecht', () => {
    ['Melvin', 'Sara'].forEach((naam) => {
      cy.visit('http://localhost:3000/login');
      cy.get('button.login__account').contains(naam).click();
      cy.get('.sidenav').should('be.visible');
    });
  });
});