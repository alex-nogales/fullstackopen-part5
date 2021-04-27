describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Alex Nogales',
      username: 'anogales',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blog app!')
    cy.contains('Blog app, Department of Computer Science, University of Helsinki 2021')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('anogales')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('Alex Nogales logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('anogales')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('This is a cypress test')
      cy.get('#author').type('Cypress Test')
      cy.get('#url').type('http://cypress.com')

      cy.get('#create-blog').click()
      cy.contains('Blog created correctly')
    })
  })
})


