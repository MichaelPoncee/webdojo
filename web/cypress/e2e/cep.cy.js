import address from '../fixtures/cep.json' //importanto o arquivo cep.json de fixtures e dando o nome de address

describe('CEP', () => {
    beforeEach(() => {
        cy.login(true) // se colocar true ele faz o login, se deixar em branco vai para o cep direto, foi criado uma função da linha 62 a 73 no commands
        cy.goto('Integração', 'Consulta de CEP')
    })
    it('Deve validar a consulta de CEP', () => {
        cy.get('#cep').type(address.cep)
        cy.contains('button', 'Buscar').click()

        cy.get('#street')
            .should('have.value', address.street) // Validar o valor Rua Silveira Pires 
        cy.get('#neighborhood')
            .should('have.value', address.neighborhood) // Validar o valor Rua Silveira Pires 
        cy.get('#city')
            .should('have.value', address.city)// Validar o valor Rua Silveira Pires 
        cy.get('#state')
            .should('have.value', address.state)// Validar o valor SP
    })

})