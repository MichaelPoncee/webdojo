describe('Cadastro', () => {
    beforeEach(() => {
        //commands criado para acessar o sistema e clicar no registre-se: linha 37 a 43 de commands
        cy.gotoSignup()
        //Forçar o sistema apresentar a mensagem de sucesso ao invés de chamar a API real "MOCK, QUE ESTÁ REALMENTE EXECUTANDO O BOTÃO E ESTÁ TENDO UMA AÇÃO"
        cy.intercept('POST','http://localhost:3333/api/users/register',
        {
            statusCode: 201,
            body: {
                message:'usuário cadastrado com sucesso'
            }
        }).as('postSignup') // até aqui 
    })

    it('Deve cadastrar um novo usuário', () => {
        cy.get('#name')
            .type('Fernando Papito')
        cy.get('#email')
            .type('papito@teste.com.br')
        cy.get('#password')
            .type('123456')
        cy.contains('button', 'Criar conta')
            .click()

            cy.wait('@postSignup') // mostrando a mensagem do mock que fiz com a mensagem de sucesso , linha 5 a linha 12
            cy.contains('Conta criada com sucesso!')
            .should('be.visible')
        })
})