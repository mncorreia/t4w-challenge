## Olá!

## Para executar os testes é necessário:

- Node instalado (Ideal acima da versão v8.11)
- Opcional(docker)

## A aplicação é dividida em duas partes:

- API Rest NodeJs:
   Faz a ponte entre uma rota de busca de hotéis no serviço disponível no desafio, validando os dados, ordenando e retornando.

- FrontEnd :
    Uma única página para busca dos dados no back-end e disponibilizando na página.

- Para testar back-end:
```sh
$ npm install && npm start
``` 

- Para testar o front-end
Abra a página do front-end(estático no navegador/NGINX caso use Docker-descrito logo após).
Preencha os campos necessários e a API-retornará os dados.

Docker:
    Executar o comando abaixo dentro da pasta raiz para iniciar a execução dos serviços:
 
 ```sh
 $ docker-compose up
 ```

### A arquiterura:    
- Esta aplicação inicialmente tinha o propósito inicial de arquitetura server-side e client-side integrada, na utilização da engine `Node.JS`, e frameworks para desenvopvimento mais ágil e modular na configuração do serviço web. Frameworks e bibliotecas como [Express](https://www.npmjs.com/package/express), [EJS](https://www.npmjs.com/package/ejs), [Bluebird](https://www.npmjs.com/package/bluebird), entre outros, auxiliam na integração web e controle e de processamento assíncrono, porém, houve dificuldades na integração do framework de html engine [EJS](https://www.npmjs.com/package/ejs), no contratempo, foi necessário modular a estrutura, removendo a parte de renderização de templatea htmls, sendo adicionados em uma parte separada da aplicação `server-side`, onde, o servidor não delegaria obrigatoriamente para o cliente, assim, o lado cliente precisará delegar para o servidor e receber o retorno da informação para tratanento.

### Desenvolvimento do lado servidor:
Iniciando a estrutura com módulos e serviços, que contemplam dentro de suas classes funções totalmente voltadas para a utilização de um escopo, por exemplo, o serviço `"Express.service"`, diz respeito a um serviço que contém uma chamada do serviço Express e sua customização para abrir o servidor. Já "modules", representa parte acessível da aplicação, voltado para seu compartilhamento e tratamento de uma atividade, por exemplo, uma requisição `HTTP` num método específico.

### Desenvolvimento do lado cliente:
Pela mudança de planos no desenvolvimento, a aplicação alterou o seu curso, logo que, no momento não foi possível configurar o motor de renderização de templates embutidos de informação, foi necessário separar os dois lados. Assim, na estrutura do arquivo **docker-compose.yml** inclusive, contém o serviço do [NGINX](https://unit.nginx.org/installation/) hospedando a página localmente. Partindo pro desenvolvimento, com base numa estrutura bem conhecida dos elementos/aquivos `"públicos"` do lado cliente, que é composto por uma pasta para estilos, scripts e fonts, e se necessário, para as próprias páginas. Foi bem difícil desenhar exatamente como seria a tela com o formulário, logo após, utilizando bastante o sistema de "grid" do framework web [__Materialize__](https://materializecss.com/) para responsividade, modificando bastante o estilo dos componentes para comportar de uma "razoável" forma. A aplicação contempla um simples formulário, na possibilidade de efetuar a requisição proposta.

##### Features/fixs futuros para aprendizado:

- Contemplar o front-end junto com o back-end numa aplicação acoplada utilizando uma `view engine
- Utilizar [redis.io](https://redis.io/) para guardar o dado buscado em cache, caso seja necessário paginação e offsets
  
