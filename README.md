# BACK-HOX

**Pré-requisito**  
Yarn  
Docker  
MongoDB

**Início**  
Para iniciar o desenvolvimento, é necessário clonar o projeto do GitHub num diretório de sua preferência:

`cd "diretório da sua preferencia"`  
`git clone git@github.com:mmendesk/back-hox.git`

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

**ENDPOINT DA APLICAÇÃO**

**Users**  
`http://localhost:3000/users`

Examples Insomnia:  
`{`  
 `"name": "Teste",`  
 `"email": "hox-tecno@hox.com",`  
 `"password": "123",`  
 `"active": true`  
`}`

Pegando o Bearer para acessar as demais rotas:

Examples Insomnia:  
`{`  
 `"email": "hox-tecno@hox.com",`  
 `"password": "123",`  
`}`

Com isso, deve retornar o Bearer do usuário e inserir nos Headers, para que seja possível fazer as demais funcionalidades do sistema.

**Categorias**

` @POST http://localhost:3000/categorie`  
` @GET http://localhost:3000/categories`  
` @GET http://localhost:3000/categorie/:id`  
` @PUT http://localhost:3000/categorie-update/:id`

**Produtos**

` @POST http://localhost:3000/product`  
` @GET http://localhost:3000/products`  
` @GET http://localhost:3000/product/:id`  
` @PUT http://localhost:3000/product-update/:id`
