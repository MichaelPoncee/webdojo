//<reference types="cypress" />
describe('iFrame', () => {
    it('Deve poder tocar o video de exemplo', () => {
        cy.login()//helper de login
        cy.contains('Video').click()

        cy.get('iframe[title="Video Player"]')//buscando o iframe do video
            .should('exist')//verificar se existe
            .its('0.contentDocument.body')//buscar o conteudo da pagina que contem dentro do iframe, passa o 0 para pegar o body que foi encontrado 
            .then(cy.wrap)//é um recurso para que vc pegue o valor de um objeto ou array ou de um elemento que esta dentro de uma pagina de hmtl e transforma em um objeto cypress para usarmos o camando cypress nele
            .as('iFramePlayer') // grando dentro de um ailias
            cy.get('@iFramePlayer') // buscando o iFramePlayer que está dentro do as.
            .find('.play-button') // buscar o elemento botão player q ue está dentro do iframe
            .click()// clicando no botão player

            cy.get('@iFramePlayer') //verificar no iFramPlayer do .as
            .find('.pause-button') // buscar elemento chamado pause-button
            .should('be.visible') // verificar se está visivel
    })

})