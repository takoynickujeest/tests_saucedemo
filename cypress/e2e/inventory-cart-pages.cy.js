/// <reference types="cypress"/>



describe('Inventory/Cart pages', () => {

beforeEach(()=> {
    //логинимся
    cy.visit('https://www.saucedemo.com/', {timeout:3000}) //не знаю зачем тут таймаут ибо один хуй не помогает
    cy.get('[data-test="username"]').as('Username').click().type('standard_user{enter}')
    cy.get('[data-test="password"]').as('Password').click().type('secret_sauce{enter}')
    cy.get('[data-test="login-button"]').as('Login').click()

    //удобности
    cy.get('#item_4_title_link > .inventory_item_name').as('ProductTitleID4') //тайтл продукта
    cy.get('#item_4_img_link > .inventory_item_img').as('ProductPhotoID4') //фото продукта
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').as('AddCartID4') //заменяем на удобность
    cy.get('#item_0_title_link > .inventory_item_name').as('ProductTitleID0') //тайтл второго продукта
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').as('AddCartID0') //удобность 
    cy.get('.shopping_cart_link').as('ShoppingCart') //удобность очередная
    cy.get('#react-burger-menu-btn').as('MenuButton')
    

})

it('1. Check that /inventory page opened on logging in with correct creds', ()=> {

//самый важный тест во всем сьюте
    cy.url().should('include', '/inventory.html')

})


it('2. Check that clicking on ProductTitle (id=4) or PoductPhoto leads to ProductPage (id=4)', ()=> {
//тыкаем на тайтл продукта и идем на его страницу и проверяем что она есть
    cy.get('@ProductTitleID4').click()
    cy.url().should('include', '?id=4')

//чекаем что есть кнопка "назад" и идем назад
    cy.get('[data-test="back-to-products').click()  
    cy.url().should('include', '/inventory.html')

//тыкаем на фото продукта и идем на его страницу и проверяем что она есть
    cy.get('@ProductPhotoID4').click()
    cy.url().should('include', '?id=4')

})

//да, четвертый тест. ацтань
it('4. Clicking at "Add to cart" button triggers counter icon (n+1) on "Cart" icon. And changes to "Remove" button', ()=> {

//добавляем 2 продукта
    cy.get('@AddCartID4').click()
    cy.get('@AddCartID0').click()
    cy.get('[data-test="remove-sauce-labs-backpack"]').as('RemoveID4') //обзываем ремув пушто так хочу
    cy.get('[data-test="remove-sauce-labs-bike-light"]').as('RemoveID0') //обзываем ремув пушто так хочу

//чекаем каунтер
    cy.get('.shopping_cart_badge').should('have.text', '2')

//чекаем что кнопка ремув есть у обоих продуктов
    cy.get('@RemoveID0').should('be.visible')
    cy.get('@RemoveID4').should('be.visible')

 })

it('5. Clicking at "Remove" button changes it to "Add to cart" button and removes (n-1) on "Cart" icon', ()=> {
    
//добавляем два продукта и обзываем ремувы
    cy.get('@AddCartID4').click()
    cy.get('@AddCartID0').click()
    cy.get('[data-test="remove-sauce-labs-backpack"]').as('RemoveID4')
    cy.get('[data-test="remove-sauce-labs-bike-light"]').as('RemoveID0')

//чекаем каунтер ==2
    cy.get('.shopping_cart_badge').should('have.text', '2')

//ремуваем один из продуктов и чекаем что кнопка заменилась
    cy.get('@RemoveID4').click()
    cy.get('@AddCartID4').should('exist')

//также чекаем что каунтер изменился на -1 
    cy.get('.shopping_cart_badge').should('have.text', '1')

})

it('6. Clicking on "Cart" icon opens CartPage with products in it.', ()=> {

//добавляем два продукта
    cy.get('@AddCartID4').click()
    cy.get('@AddCartID0').click()

//идем в корзину
    cy.get('@ShoppingCart').click()

//чекаем что продукты добавлены и что кнопки ремува есть 
    cy.get('@ProductTitleID0').should('be.visible')
    cy.get('@ProductTitleID4').should('be.visible')
    cy.get('[data-test="remove-sauce-labs-backpack"]').as('RemoveID4').should('exist')  
    cy.get('[data-test="remove-sauce-labs-bike-light"]').as('RemoveID0').should('exist')

//чекаем разные кнопки 
    cy.get('[data-test="continue-shopping"]').should('exist') //андрюха лучший друк
    cy.get('[data-test="checkout"]').should('exist') //чекаут

})

it('8. Clicking at "Reset app state" clears counter on "Cart" and clears state for "Add to cart" buttons', ()=> {

//добавляем продукты
    cy.get('@AddCartID4').click()
    cy.get('@AddCartID0').click()

//чекаем что все ок что кнопки и бадж добавился
    cy.get('.shopping_cart_badge').should('have.text', '2')
    cy.get('[data-test="remove-sauce-labs-backpack"]').as('RemoveID4').should('exist')  
    cy.get('[data-test="remove-sauce-labs-bike-light"]').as('RemoveID0').should('exist')

//идем в меню тыкаем на резет
    cy.get('@MenuButton').click()
    cy.get('#reset_sidebar_link').click()

//тут чекаем что зачистился бадж
    cy.get('.shopping_cart_badge').should('not.exist')

 //тут проверяем что кнопки зарезетились (но тест упадет так как баг)
    cy.get('@RemoveID0').should('not.be.visible')
    cy.get('@RemoveID4').should('not.be.visible')



 })



})