# Lulamolusco-API

**Pré-requisito**  
Yarn  
Docker  
MongoDB

**Início**  
Para iniciar o desenvolvimento, é necessário clonar o projeto do GitHub num diretório de sua preferência:

`cd "diretório da sua preferencia"`  
`git clone git@github.com:pessoalize/back-hox.git`

**Instalando Dependências**  
Para instalar as dependências do projeto, executar os comando abaixo:

`yarn` ou `yarn install`

O comando irá baixar todas as dependências do projeto e criar um diretório com os artefatos construídos, que incluem o arquivo node_modules do projeto.

**Rodando o Projeto**  
Para executar o projeto, é necessário ter instalado o `make`. Contendo todas as instalações obrigatórias, podemos executar o seguinte comando:

`make up-and-log`

O que irá subir o nosso docker juntamente com o mongo e nos apresentara o console caso algum erro aconteça na nossa API.  
Podemos também, rodar apenas o comando sem os logs:

`make up`

**ENDPOINT**

**Users**  
`http://localhost:3000/users`

Examples Insomnia:  
`{`  
 `"name": "Teste",`  
 `"email": "mmendesca@icloud.com",`  
 `"password": "123",`  
 `"active": true`  
`}`
