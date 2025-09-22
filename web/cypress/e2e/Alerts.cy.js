describe('Validações de Alertas em JavaScript', () => {
    beforeEach(() => {
        cy.login()
        cy.goto('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar a mensagem de alerta', () => {
        cy.log('todo')

        //ficar de ouvinte, que vai esperar isso ocorrer para validar a mensagem, sempre colocar antes do click do botão
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um dialogo e validar a resposta positiva', () => {
        //ficar de ouvinte, que vai esperar isso ocorrer para validar a mensagem, sempre colocar antes do click do botão
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return true; // True = simlua o clique no botão ok True = simlua o clique no botão cancelar
        })
        //confirmando que clicou em Ok na janela do alerta
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve cancelar um dialogo e validar a resposta negativa', () => {
        //ficar de ouvinte, que vai esperar isso ocorrer para validar a mensagem, sempre colocar antes do click do botão
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return false; // True = simlua o clique no botão cancelar
        })
        //confirmando que clicou em Ok na janela do alerta
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()

    })

    it('Deve interagir com um prompt, inserir um texto e validar uma mensagem', () => {
        cy.window().then((win) => {//acessa a janela do navegador
            cy.stub(win, 'prompt').returns('Fernando') // simula o preenchimento do prompt e clicando no Ok
        })
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Fernando! Boas-vindas ao WebDojo!')
        })
        cy.contains('button', 'Mostrar Prompt').click()
    })

})