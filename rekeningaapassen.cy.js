// rekeningaanpassen

describe('Rekening aanpassen, transacties en saldo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('button.login__account').contains('Melvin').click();
  });

  it('naam van de rekening wijzigen', () => {
    cy.get('.sidenav').contains('Instellingen').click();

    cy.get('input[name="name"]').clear().type('Spaarrekening Melvin');
    cy.get('button').contains('Opslaan').click();

    cy.reload();
    cy.contains('Spaarrekening Melvin').should('be.visible');
  });

  it('transacties bekijken', () => {
    cy.get('.sidenav').contains('Transacties').click();

    cy.contains('Inkomsten').should('be.visible');
    cy.contains('Uitgaven').should('be.visible');
  });

  it('saldo controleren', () => {
    cy.get('.sidenav').contains('Overzicht').click();

    cy.contains('€').should('be.visible');
  });

  it('saldo en transacties kloppen na een overboeking', () => {
    cy.get('.sidenav').contains('Overboeken').click();
    cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    cy.get('select[name="toaccount"]').select('Sara Ravestein');
    cy.get('input[name="amount"]').type('25');
    cy.get('textarea[name="description"]').type('Controle saldo cypress');
    cy.get('button').contains('Overboeken').click();
    cy.contains('Het is gelukt om € 25 over te maken!').should('be.visible');

    cy.get('.sidenav').contains('Transacties').click();
    cy.contains('Controle saldo cypress').should('be.visible');
  });
});