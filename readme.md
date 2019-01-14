Olá!

Para executar os testes é necessário:

- Node instalado (Ideal se ser a versão v8.11.3)
- Opcional(docker)

A aplicação é divida em duas partes:

- API Rest NodeJs:
    Faz a ponte entre uma rota de busca de hotéis do serviço disponível no desafio, validando o dado, ordenando e retorno.

- FrontEnd:
    Uma única página para busca dos dados no back-end e disponibilizando na página.

Para efetuar os testes, rode o serviço back-end com o comando "npm install && npm start", em seguida,
abra a página do front-end(estático no navegador/NGINX caso use Docker-descrito logo após).
Preencha os campos necessários e a API-retornará os dados.

Docker:
    Executar o comando "docker-compose up" dentro da pasta raiz para iniciar a execução dos serviços.

A arquiterura:
Esta aplicação inicialmente tinha o propósito inicial de arquitetura server-side e client-side integrada, na utilização da engine Node.JS, e frameworks para desenvopvimento mais ágil e modular na configuração do serviço web. Frameworks e bibliotecas como Express.JS, EJS, Bluebird, entre outros, auxiliam na integração web e controle e de processamento assíncrono, porém, houve dificuldades na integração do framework de html engine EJS, no contratempo, foi necessário modular a estrutura, removendo a parte de renderização de templatea htmls, sendo adicionados em uma parte separada da aplicação server-side, onde, o servidor não delegaria obrigatoriamente para o cliente, assim, o lado cliente precisará delegar para o servidor e receber o retorno da informação para tratanento.

Desenvolvimento do lado servidor:
Iniciando a estrutura com de serviços, que contemplam dentro de suas classes funções totalmente voltadas para a utilização de um escopo, por exemplo, o serviço "Express.service", diz respeito a configuração do servidor 
