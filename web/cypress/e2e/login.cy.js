//imporando a função todayDate da pasta support que está no arquivo utils utilizado na linha 19 a 28
 import { todayDate } from "../support/utils" 

describe('Login', () => {//Agrupar um conjuto de testes automatizados
  it('Deve logar com sucesso', () => { //Caso de teste
    cy.start()//*Buscar no commands.js*/   
    cy.submitLoginForm('papito@webdojo.com', 'katana123')  //*Buscar no commands.js*/   
    //Tabulação para verificar se o texto Fernando papito está visivel
    cy.get('[data-cy="user-name"]')//campo do nome
      .should('be.visible')// tem que estar visivel
      .and('have.text', 'Fernando Papito')//qual texto tem que estar visivel
    //Tabulação para verificar se o texto Olá QA, esse é o seu Dojo para aprender Automação de Testes. está visivel
    cy.get('[data-cy="welcome-message"]')// Campo do texto
      .should('be.visible')// tem que estar visivel
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.') //qual texto tem que estar visivel


    // verificar o cookie, apertando f12 -> application -> cookies -> local host
    cy.getCookie('login_date').should('exist')
    // colocando uma função em java : todayDate, para verificar a data correta todos os dias do cookie, quando logamos no sistema
    cy.getCookie('login_date').should((cookie) => {
      expect(cookie.value).to.eq(todayDate())
    })
    // validando a chave token do storage, apertando f12 -> application -> Local Sotrage -> token
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.match(/^[a-fA-F0-9]{32}$/) //expressão regular para testar o token, se está no formato MD5
    })
  })

  it('Não Deve logar com senha inválida', () => { //Caso de teste
    cy.start()//*Buscar no commands.js*/   
    cy.submitLoginForm('papito@webdojo.com', 'katana321')  //*Buscar no commands.js*/   
    cy.contains('Acesso negado! Tente novamente.')// criei um contains cujo o texto é Acesso negado! Tenter novamente.
      .should('be.visible')// tem que estar visivel
    cy.wait(3000) // aguardar 3 segundo
  })

  it('Não Deve logar com e-mail não cadastrado', () => { //Caso de teste
    cy.start()//*Buscar no commands.js */ 
    cy.submitLoginForm('404@webdojo.com', 'katana123')  //*Buscar no commands.js*/    
    cy.contains('Acesso negado! Tente novamente.')// criei um contains cujo o texto é Acesso negado! Tenter novamente.
      .should('be.visible')// tem que estar visivel
    cy.wait(3000) // aguardar 3 segundo
  })
})