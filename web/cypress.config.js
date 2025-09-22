const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true,//habilitando o Studio para ajudar nos testes dentro do cypress
    video: true, //Habilitar gravação de video dos testes utilizando o comando(npx cypress run --browser=chrome)
    baseUrl: 'http://localhost:3000/' // url principal dos testes só utilizar /, é a rota que utiliza a pagina principal
   
  },
});

