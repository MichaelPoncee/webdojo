//<reference types="cypress" />
import consultancyData from '../fixtures/consultancy.json' //impotando a massa de testes do arquivo consultancy.json da pasta fixtures
// import {personal, company} from '../fixtures/consultancy.json' // caso eu precise utilizar apenas um dos dois no teste {personal, company} são os jsons do arquvio consultancy no fixture, se for assim, lembrar de trocar os campos consultancyForm por personal ou company
describe('Formulario de Consultoria', () => {
    //beforeEach = executar antes dos testes
    //Staps de pré condição são repetidas para os dois casos de testes, para ficar mais clin o codigo
    beforeEach(() => {
        cy.login() // helper de login
        cy.goTO('Formulários', 'Consultoria') //Buscar o botão e verificar o titulo da pagina que acessou//*Buscar no commands.js*/ 

        cy.fixture('consultancy.json').as('consultancyData') // procurar o arquivo consultancy.json na pasta fixture
    })

    it('Deve solicitar consultoria individual', () => {

        const consultancyForm = consultancyData.personal //  para buscar um objeto que foi definido em um objeto externo, está buscando dentro do describe o consultancyform

        cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name) //preencher email pelo placehouder
        cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)  //preencher email pelo placehouder
        cy.get('input[placeholder="(00) 00000-0000"]').type(consultancyForm.phone)  //preencher telefone pelo placehouder
        //.should('have.value', '(11) 12345-6789') // validando se o valor é igual o telefone é o que esta mostrando na tela conforme a mascara
        cy.get('#consultancyType').select('Individual') //Selecionar caixa de opções selecionando a opção In Company

        if (consultancyForm.personType === 'cpf') {//java verificar se pessoa fisica esta marcado e verifica se a pessoa juridica não está selecionado
            //selecionar radio Pessoa Fisica
            cy.contains('span', 'Pessoa Física')//buscando a opção com o nome Pessoa fisica
                .parent()// sobe para o elemento pai desse <span>
                .find('input') // procura um <input> dentro do pai
                .check() // marca o input (geralmente radio ou checkbox)
                .should('be.checked')// valida que está marcado

            //Confirmando que o botão de radio não está sendo marcado
            cy.contains('span', 'Pessoa Jurídica') //buscando a opção com o nome Pessoa juridica
                .parent() // sobe para o elemento pai desse <span>
                .find('input') // procura um <input> dentro do pai
                .should('be.not.checked') // valida que não está marcado
        }

        if (consultancyForm.personType === 'cnpj') {//java verificar se pessoa juridica esta marcado e verifica se a pessoa fisica não está selecionado

            //selecionar radio Pessoa Fisica
            cy.contains('span', 'Pessoa Jurídica')//buscando a opção com o nome Pessoa fisica
                .parent()// sobe para o elemento pai desse <span>
                .find('input') // procura um <input> dentro do pai
                .check() // marca o input (geralmente radio ou checkbox)
                .should('be.checked')// valida que está marcado

            //Confirmando que o botão de radio não está sendo marcado
            cy.contains('span', 'Pessoa Física') //buscando a opção com o nome Pessoa juridica
                .parent() // sobe para o elemento pai desse <span>
                .find('input') // procura um <input> dentro do pai
                .should('be.not.checked') // valida que não está marcado
        }
        //Preenchendo o CPF
        cy.contains('label', 'CPF').type(consultancyForm.document) //preencher o cpf label
            .parent() // sobe para o elemento pai desse <label>
            .find('input') // procura um <input> dentro do pai
        //.should('have.value', '656.025.300-70') // validando se o valor é igual o CPF é o que esta mostrando na tela conforme a mascara

        /*//Criei um array de canais para ficar mais bonito no codigo
        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]*/

        /*Foreach vai percorrer pela lista de canais FAZENDO com que o Cypress selecione um por vez NA LISTA DE CANAIS
        Ex: primeiro vai pegar Instagram, depois lindedin até indicacao de amigo.
        */
        consultancyForm.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)//buscando a opção com o nome Instagram
                .find('input') // procura um <input> dentro do pai
                .check() // marca o input (geralmente radio ou checkbox)
                .should('be.checked')// valida que está marcado
        })

        //Fazendo Upload do arquivo
        cy.get('input[type="file"]') // Buscando o botão de upload
            .selectFile(consultancyForm.file, { force: true }) // selecionando o arquivo PDF inserido na pasta Fixtures

        //Selecionar textarea pelo placeholder
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(consultancyForm.description)

        /*  //Criei um array chamado techs para ficar mais bonito no codigo
          const techs = [
              'Cypress',
              'Selenium',
              'WebDriverIO',
              'Playwright',
              'Robot Framework'
          ]*/
        /*Foreach vai percorrer pela lista techs FAZENDO seja preenchido cada nome de tecnologia exemplo 1° cypress, 2° selenium e etc....
       */
        consultancyForm.techs.forEach((tech) => {
            //Selecionar campo de texto pelo placeholder
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech) // Digitando Cypress
                .type('{enter}') // Apertando Enter

            // validando o que foi digitado acima
            cy.contains('label', 'Tecnologias') // a div
                .parent() // sobe para o elemento pai desse <label>
                .contains('span', tech)
                .should('be.visible')
        })

        if (consultancyForm.terms === true) {
            // clicando no checkbox dos termos de uso
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }
        //clicando no botão enviar
        cy.contains('button', 'Enviar formulário').click()
        //validando se o modal está aparecendo com o texto, após o preenchimento do fomulario
        cy.get('.modal', { timeout: 7000 })
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        //   .should('be.visible')
    })

    it('Deve verificar os campos obrigatórios', () => {

        //Array, lista de campos obrigatórios de objetos onde tenho a label e o message
        cy.submitConsultancyForm()
        const requiredFields = [
            { label: 'Nome Completo', message: 'Campo obrigatório' },
            { label: 'Email', message: 'Campo obrigatório' },
            { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' }
        ]

        requiredFields.forEach(({ label, message }) => {
            //Validar a mensagem se não preencher os campos obrigatorios   
            cy.contains('label', label)
                .parent()// sobe para o elemento pai desse <label>
                .find('p') // para pegar o texto do elemento paragrafo
                .should('be.visible')//mensagem tem qeu estar visivel
                .should('have.text', message) // Validar o texto do paragrafo
                .and('have.class', 'text-red-400')// Verificando se a cor da mensagem é vermelha
        })
    })

    it('Deve solicitar consultoria In Company', () => {

        //javascript - massa de testes  / definir esse valor ele é uma constante, pois é um valor imutavel
        const consultancyForm = consultancyData.company // buscar um objeto que foi definido em um objeto externo, está buscando dentro do describe o consultancyform (company é o nome da massa de testes que está no fixtures,json)

        cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name) //preencher email pelo placehouder
        cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)  //preencher email pelo placehouder
        cy.get('input[placeholder="(00) 00000-0000"]').type(consultancyForm.phone)  //preencher telefone pelo placehouder
        //.should('have.value', '(11) 12345-6789') // validando se o valor é igual o telefone é o que esta mostrando na tela conforme a mascara
        cy.get('#consultancyType').select('Individual') //Selecionar caixa de opções selecionando a opção In Company

        if (consultancyForm.personType === 'cpf') {//java verificar se pessoa fisica esta marcado e verifica se a pessoa juridica não está selecionado
            //selecionar radio Pessoa Fisica
            cy.contains('span', 'Pessoa Física')//buscando a opção com o nome Pessoa fisica
                .parent()// sobe para o elemento pai desse <span>
                .find('input') // procura um <input> dentro do pai
                .check() // marca o input (geralmente radio ou checkbox)
                .should('be.checked')// valida que está marcado

            //Confirmando que o botão de radio não está sendo marcado
            cy.contains('span', 'Pessoa Jurídica') //buscando a opção com o nome Pessoa juridica
                .parent() // sobe para o elemento pai desse <span>
                .find('input') // procura um <input> dentro do pai
                .should('be.not.checked') // valida que não está marcado
        }

        if (consultancyForm.personType === 'cnpj') {//java verificar se pessoa juridica esta marcado e verifica se a pessoa fisica não está selecionado

            //selecionar radio Pessoa Fisica
            cy.contains('span', 'Pessoa Jurídica')//buscando a opção com o nome Pessoa fisica
                .parent()// sobe para o elemento pai desse <span>
                .find('input') // procura um <input> dentro do pai
                .check() // marca o input (geralmente radio ou checkbox)
                .should('be.checked')// valida que está marcado

            //Confirmando que o botão de radio não está sendo marcado
            cy.contains('span', 'Pessoa Física') //buscando a opção com o nome Pessoa juridica
                .parent() // sobe para o elemento pai desse <span>
                .find('input') // procura um <input> dentro do pai
                .should('be.not.checked') // valida que não está marcado
        }
        //Preenchendo o CPF
        cy.contains('label', 'CNPJ').type(consultancyForm.document) //preencher o cpf label
            .parent() // sobe para o elemento pai desse <label>
            .find('input') // procura um <input> dentro do pai
        //.should('have.value', '656.025.300-70') // validando se o valor é igual o CPF é o que esta mostrando na tela conforme a mascara

        /*//Criei um array de canais para ficar mais bonito no codigo
        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]*/

        /*Foreach vai percorrer pela lista de canais FAZENDO com que o Cypress selecione um por vez NA LISTA DE CANAIS
        Ex: primeiro vai pegar Instagram, depois lindedin até indicacao de amigo.
        */
        consultancyForm.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)//buscando a opção com o nome Instagram
                .find('input') // procura um <input> dentro do pai
                .check() // marca o input (geralmente radio ou checkbox)
                .should('be.checked')// valida que está marcado
        })

        //Fazendo Upload do arquivo
        cy.get('input[type="file"]') // Buscando o botão de upload
            .selectFile(consultancyForm.file, { force: true }) // selecionando o arquivo PDF inserido na pasta Fixtures

        //Selecionar textarea pelo placeholder
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(consultancyForm.description)

        /*  //Criei um array chamado techs para ficar mais bonito no codigo
          const techs = [
              'Cypress',
              'Selenium',
              'WebDriverIO',
              'Playwright',
              'Robot Framework'
          ]*/
        /*Foreach vai percorrer pela lista techs FAZENDO seja preenchido cada nome de tecnologia exemplo 1° cypress, 2° selenium e etc....
       */
        consultancyForm.techs.forEach((tech) => {
            //Selecionar campo de texto pelo placeholder
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech) // Digitando Cypress
                .type('{enter}') // Apertando Enter

            // validando o que foi digitado acima
            cy.contains('label', 'Tecnologias') // a div
                .parent() // sobe para o elemento pai desse <label>
                .contains('span', tech)
                .should('be.visible')
        })

        if (consultancyForm.terms === true) {
            // clicando no checkbox dos termos de uso
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }
        //clicando no botão enviar
        cy.contains('button', 'Enviar formulário').click()
        //validando se o modal está aparecendo com o texto, após o preenchimento do fomulario
        cy.get('.modal', { timeout: 7000 })
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        //   .should('be.visible')
    })

})

