describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Alex Nogales',
      username: 'anogales',
      password: 'password'
    }
    const superUser = {
      name: 'superUser',
      username: 'root',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', superUser)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Login to the app')
    cy.contains('Blog app, Department of Computer Science, University of Helsinki 2021')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('anogales')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('Alex Nogales is logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Incorrect user or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Alex Nogales is logged in')
  })

  describe('when logged in', function() {
    //OLD WAY TO DO THIS
    /*     beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('anogales')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    }) */
    // NEW WAY TO DO THIS
    /* beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'anogales', password: 'password'
      }).then(response => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    }) */
    // NEW WAY USING COMMANDS
    beforeEach(function() {
      cy.login({ username: 'anogales', password: 'password' })
    })

    it('a new blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('This is a cypress test')
      cy.get('#author').type('Cypress Test')
      cy.get('#url').type('http://cypress.com')

      cy.get('#create-blog').click()
      cy.contains('Blog created correctly')
    })

    describe('and a blog exists', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'This is a command test', author: 'Cypress', url: 'http://cypress.org', likes: 0 })
      })
      it('can like', function() {
        cy.contains('show').click()
        cy.contains('likes').click()

        cy.contains('Correctly liked')
      })

      it('can be deleted', function() {
        cy.contains('show').click()
        cy.contains('delete').click()

        cy.contains('Blog deleted correctly')
      })

      it.only('other user cannot delete', function() {
        cy.contains('logout').click()
        cy.login({ username: 'root', password: 'password' })
        cy.contains('show').click()

        cy.contains('delete').should('not.exist')
      })

    })
  })
})


