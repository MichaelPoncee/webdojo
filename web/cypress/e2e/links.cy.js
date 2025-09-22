describe('Links abrindo nova guia/janela', () => {
    //beforeEach = executar antes dos testes
    //Staps de pré condição são repetidas para os dois casos de testes, para ficar mais clin o codigo
    beforeEach(() => {
        cy.login() // helper de login
        cy.goTO('Formulários', 'Consultoria') //Buscar o botão e verificar o titulo da pagina que acessou//*Buscar no commands.js*/ 
    })
    it('Validando o atributo do link do instagram', () => {       
        //garantindo que ao clicar o link e confirmando que ele está indo para a pagina do instagram
        //tela aberta em outra guia
        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito') // validar o atributo quando o endereço de destino não é a da minha equipe
            .and('have.attr', 'target', '_blank')
    })
       
    it('Acessa Link de termos de uso removendo o target blank', () => {      
        cy.contains('Formulários').click()
        cy.contains('a', 'termos de uso').click()
            .invoke('removeAttr', 'target') // remover o atributo target para abrir outra pagina na mesma sessão
            .click()
        cy.contains('Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.')
            .should('be.visible')
    })
})