//<reference types="cypress" />
describe('Kanban Board', () => {
    it('Deve mover uma tarefa de Todo para Done e atualizar o board', () => {
        cy.login()//helper de login
        cy.contains('Kanban').click()
        const dataTransfer = new DataTransfer() // serve para transferir um elemento html para transferir em outro bloco html

        cy.contains('div[draggable=true]', 'Documentar API') // buscar o card Documentar api
            .trigger('dragstart', { dataTransfer }) // ele faz o clicar, segurar e arrastar (comando dragstar clica segura e arrasta)

        //simular o arrastar
        cy.get('.column-done')
            .trigger('drop', { dataTransfer }) //soltar comando drop solta
            .find('h3') //buscar a tag com o html 3
            .should('have.text','Done (4)') // verificar se o texto da coluna foi para 4
            // verificando se o o card Documentar API está está na coluna DONE
            cy.get('.column-done')
            .should('include.text', 'Documentar API')
            .and('include.text', 'Criar documentação da API com Swagger')

    })


})