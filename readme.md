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




