describe('to-do app', () => {

  // store a todo item text in a variable
  const newToDoItem = 'Pick a parcel'
  const groceryList = ['banana', 'apple', 'milk', 'cereal', 'bread']

  function addTodoItems (items) {
    items.map(item => 
      cy.findByPlaceholderText('What to do...').type(`${item}{enter}`)
      )
  }

  function checkToDoItem (items) {
    items.map(item => 
      cy.findByText(item)
      .parents('li')
      .find('input[type=checkbox]')
      .check()
      )
  }

  beforeEach(() => {
    cy.visit('/')
  })

  context('add and remove todo items', () => {
    it('can add new todo item and mark it as checked', () => {
      cy.findByPlaceholderText('What to do...').type(`${newToDoItem}{enter}`)
      cy.get('.todo-list li')
        .should('have.length', 1)
        .contains(newToDoItem)

      cy.findByText(newToDoItem)
        .parents('li')
        .find('input[type=checkbox]')
        .check()

      cy.findByText(newToDoItem)
        .parents('li')
        .should('have.class', 'completed')
        .find('input[checked=""]')
    })

    it('can add new todo item using the Add button', () => {
      cy.findByPlaceholderText('What to do...').type(`${newToDoItem}`)
      cy.findByRole('button', { name: 'Add' }).click()
      cy.get('.todo-list li')
        .should('have.length', 1)
        .contains(newToDoItem)
    })

    it('can delete a new todo', () => {
      cy.findByPlaceholderText('What to do...').type(`${newToDoItem}{enter}`)
      cy.findByRole('button', { name: 'Add' }).click()
      cy.get('.todo-list li')
        .should('have.length', 1)
        .contains(newToDoItem)
      //deletes the todo item
      cy.findAllByRole('button').last().click()
      cy.get('.todo-list li')
      .should('not.exist')
      cy.findByText('bread').should('not.exist')
    })
  })
  
  context('todo items marked as checked', () => {
    beforeEach(() => {
    //calls addToDoItems to add a grocery list as todo items
    addTodoItems(groceryList)
    //calls checkToDoItem to check each grocery to do item
    checkToDoItem(groceryList)
    //checks that there are five todo items
    cy.get('.todo-list li')
    .should('have.length', 5)
    })

    it('can delete a completed todo item', () => {
      //deletes the last checked list item
      cy.findAllByRole('button').last().click()
      cy.get('.todo-list li')
      .should('have.length', 4)
      .should('not.have.text', 'bread')
    })

    it('can uncheck a completed todo item', () => {
      //unchecks the last checked list item
      cy.findByText('bread')
      .parents('li')
      .find('input[type=checkbox]')
      .click()

      cy.findByText('bread')
      .parents('li')
      .should('not.have.class', 'completed')
      .find('input[type=checkbox]')
    })
  })
})
