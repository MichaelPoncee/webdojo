describe('Simulando Mouseover', ()=> {
it('Deve mostrar um texto ao passar o mouse em cima do link do instagram', () => {  
   cy.login()//helper de login
    //isso é para confirmar que a mensagem só aparece quando o mouse é passado no link do instagram. 
    cy.contains('Isso é Mouseover!').should('not.exist')
    //mouseover deixar o mouse em cima da palavra
    cy.get('[data-cy="instagram-link"]').realHover() //Realhover está configurado no commands
    //confirmar se o texto existe, mas poderia utilizar o be.visible tmb. 
    cy.contains('Isso é Mouseover!').should('exist')
})
})