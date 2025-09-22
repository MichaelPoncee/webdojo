describe('Gerenciamento de Perfis no Github', () => {

    beforeEach(() => {
        cy.login()
        cy.goto('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil do GitHub', () => {


        cy.get('#name').type('Fernando Papito')
        cy.get('#username').type('PapitoDev')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.get('#name').type('Fernando Papito')
        cy.get('#username').type('qapapito')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.contains('table tbody tr', 'PapitoDev')
            .should('be.visible')
            .as('trProfile') //alias apelido 

        cy.get('@trProfile') //alias apelido (vai buscar na linha dentro da tabela o nome PapitoDev)
            .contains('td', 'Fernando Papito')
            .should('be.visible')

        cy.get('@trProfile') //alias apelido (vai buscar na linha dentro da tabela o nome PapitoDev que contém QA)
            .contains('td', 'QA')
            .should('be.visible')
    })

    it('Deve validar o link do GitHub', () => {

        //massa de teste
        const profile = {
            name: 'Fernando Papito',
            username: 'papito123',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile') //alias apelido, posso colocar qualquer nome

        cy.get('@trProfile').find('button[title="Remover perfil"]').click() // clicando no botão dentro da linha onde existe o username = papito123 

        //Verificar se o registro não existe no corpo da tabela
        cy.contains('table tbody', profile.username)
            .should('not.exist') 
    })

    it('Deve acessar o meu perfil no GitHub', () => {

        //massa de teste
        const profile = {
            name: 'Fernando Papito',
            username: 'papitodev',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile') //alias apelido, posso colocar qualquer nome

        cy.get('@trProfile').find('a')
        .should('have.attr','href', 'https://github.com/' + profile.username) // attr(virifica o atributo href)verificando se o link do github é esse....o (+ profile.username) está concatenando o username da const do profile feito na massa de teste. ou seja, pegando o nome papitodev e ficará htts://github.com/papitodev(que é o user name)
        .and('have.attr', 'target', '_blank') // pegando a propriedade target com o valor _blank, é o que garante que abrirá emoutra pagina
         
        
    })
})