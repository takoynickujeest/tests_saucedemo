/// <reference types="cypress"/>



describe('entering values in inputs', () => {

beforeEach(()=> {
    cy.visit('https://www.saucedemo.com/', {timeout:3000})
    cy.get('[data-test="username"]').as('Username')
    cy.get('[data-test="password"]').as('Password')
    cy.get('[data-test="login-button"]').as('Login')
})

it('1. Check validation for required Password field on clicking "Enter"', ()=> {

    cy.get('@Username').click().type('abracadabra{enter}')
    cy.contains('Epic sadface').should('have.text', 'Epic sadface: Password is required' )
    cy.get('@Username').click().clear()
})


it('2. Check validation for required Username field on clicking "Enter" when password entered', ()=> {

    cy.get('@Password').focus().type('testpass{enter}')
    cy.contains('Epic sadface').should('have.text', 'Epic sadface: Username is required')
    cy.get('@Password').click().clear()
    cy.get('.error-button').click()

})


it('3. Check validation for required Username field on clicking "Login" button when Username is Empty', ()=> {

    cy.get('@Login').click()
    cy.contains('Epic sadface').should('have.text', 'Epic sadface: Username is required')
    cy.get('.error-button').click()

})

it('4. Check that error message for Username is cleared on clicking on "X" icon', ()=> {

    cy.get('@Login').click()
    cy.contains('Epic sadface').should('have.text', 'Epic sadface: Username is required')
    cy.get('.error-button').click().should('not.exist', true)
    // cy.get('.error-message-container').should('not.be.visible')

})

it('5. Check that error message for Password is cleared on clicking on "X" icon', ()=> {

    cy.get('@Username').click().type('abracadabra{enter}')
    cy.contains('Epic sadface').should('have.text', 'Epic sadface: Password is required' )
    cy.get('.error-button').click().should('not.exist', true)
})

it('6. Check that User can Login with correct creds', ()=> {

    cy.get('@Username').click().type('standard_user{enter}')
    cy.get('@Password').click().type('secret_sauce{enter}')
    cy.get('@Login').click()
    cy.url().should('include', '/inventory.html')

})

it('7. Check that User can not Login with "Locked" user credentials', ()=> {

    cy.get('@Username').click().type('locked_out_user{enter}')
    cy.get('@Password').click().type('secret_sauce{enter}')
    cy.get('@Login').click()
    cy.get('.error-message-container').should('exist')
    cy.contains('Epic sadface').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
})


})