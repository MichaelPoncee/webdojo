// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//importar a biblioteca para utilizar o mouseover
import 'cypress-real-events'
//imporando a função todayDate da pasta support que está no arquivo utils utilizada na linha 53 a 68
import { todayDate } from './utils'

//acessar a pagina e renderizar para tela de notebook
Cypress.Commands.add('start', () => {//inicia os testes
    
    cy.visit('/')//visitando o site usando /, pois foi configurado na pasta cypress.config.js o site principal, e "/" = pagina principal
})
//preencher o login e senha
Cypress.Commands.add('submitLoginForm', (email, senha) => {//faz o login no sistema
    cy.get('#email').type(email)//preenche o campo email
    cy.get('#password').type(senha)//preenche o campo senha errada
    cy.contains('button', 'Entrar').click() // criei um contains do tipo botão cujo o texto é Entrar

})
//clicando no botão e verificando o titulo da pagina
Cypress.Commands.add('goto', (buttonName, pageTitle) => {
    cy.contains('button', buttonName) // criei um contains do tipo botão cujo o texto é Formulários
        .should('be.visible')
        .click()
    cy.contains('h1', pageTitle) // verificar se o texto consultoria está visivel
        .should('be.visible')// tem que estar visivel
})

// helper para logar no sistema 
Cypress.Commands.add('login', (ui = false) => {

    if (ui == true) {
        cy.start()//acessar o site e renderizar para tela de notebook//*Buscar no commands.js*/ 
        cy.submitLoginForm('papito@webdojo.com', 'katana123') // realizar o login//*Buscar no commands.js*/ 
    } else {
        const token = 'e1033d63a53fe66c0fd3451c7fd8f617'
        const loginDate = todayDate()

        cy.setCookie('login_date', loginDate)
        //antes de carregar a pagina ele vai carregar o token e o cookie
        cy.visit('/dashboard', { //visitando o site usando /, pois foi configurado na pasta cypress.config.js o site principal, e "/dashboard" = pagina principal
            onBeforeLoad(win) {
                win.localStorage.setItem('token', token)
            }
        })
    }


})

Cypress.Commands.add('submitConsultancyForm', () => {
    // se for um formulário HTML comum
    cy.get('form').submit();
})