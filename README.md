# caixa-eletronico

<div style="text-align:center"><img src="https://github.com/ThalesGabriel/caixa-eletronico/blob/main/public/tenor.gif" alt="Money"/></div>

#### Esse desafio foi realizado seguindo as regras padrão estabelecidas pelo site [Dojo Puzzles](https://dojopuzzles.com/problems/caixa-eletronico/)

### Exemplo de Resposta

- Exemplo = R$30,00;
- Resposta API = Valor do Saque: R$ 30,00 – Resultado Esperado: Entregar 1 nota(s) de R$20,00, e 1 nota(s) de R$10,00.
- Resposta esperada pelo desafio = Valor do Saque: R$ 30,00 – Resultado Esperado: Entregar 1 nota de R$20,00 e 1 nota de R$ 10,00.

### Características do projeto

- Foi criado utilizando NodeJs como framework **JavaScript**;
  - O motivo da escolha por javascript foi a palavra chave do texto de instrução do desafio: `Simplicidade`. Por java ser uma linguagem tipada eu creio que em certos aspectos ela facilita muito, a organização e arquitetura são bem mais fáceis de se manter mas em questão de simplicidade entre java e javascript, eu creio que a segunda se destaca.
- Não foi implementado o nível `HATEOAS` pelo fato de só existir 1 endpoint `/transform?decimal=R$30,00`
- Node **v15.14.0**
- Foram utilizadas as seguintes libs:
  - [x] cors -> Acesso pelo frontend;
  - [x] config -> Alternativa ao `.env`;
  - [x] consign -> Carrega os arquivos que são especificados de maneira automática em toda aplicação;
  - [x] express -> Levantar o servidor http;
  - [x] Jest -> Testes unitários;
  - [x] Supertest -> Teste de aplicação;
  - [x] nodemon -> Utilizado durante o desenvolvimento;
  - [x] ramda -> Operações com listas.
- Utiliza uma árvore binária balanceada conhecida como AVL para realizar nossas operações;
- Utiliza `CI/CD`;
- Utiliza os conceitos do `Git Flow`;
- `CI` é feito com a pipeline do github actions, apenas nos merges da branch `develop`, para realização de `testes automatizados`;
- `CD` é feito também nas pipelines do github actions com uma `action` chamada `Beanstalk Deploy` para a implantação na `AWS`;
- Utiliza a cobertura de código do `sonarcloud` na pipeline de CI(`77% ~ 80%`).
- O `K8s` não foi utilizado nesse projeto;

### Características do desafio
- [x] Entregar o menor número de notas;
- [x] É possível sacar o valor solicitado com as notas disponíveis;
- [x] Saldo do cliente infinito;
- [x] Quantidade de notas infinito;
- [x] Notas disponíveis de R$ 100,00; R$ 50,00; R$ 20,00 e R$ 10,00.;
  - Devido a limitação de notas, assumi que os valores deveriam ser múltiplos de 10
- [ ] valor finito de cédulas para aumentar a dificuldade do problema).

### Como rodar o projeto

1. Clonando o repositório
  - Entre na pasta deste projeto depois de clonado
  - Rode `npm install`
  - Rode `npm start`
  - Abra o navegador no link http://localhost:8080/transform?decimal=R$300,00

2. Imagem docker
  - Foi utilizado multi stage building para diminuir a imagem inicial de quase 1GB possuindo agora 112MB
  - Rode `docker run -dp 8080:8080 --name app --rm 042821/caixa-eletronico`
  - Abra o navegador no link http://localhost:8080/transform?decimal=R$30,00

3. Acesso online -> BLOQUEADO(FREE TIER FINALIZADA 27/Jun/2021)
  - Se preferir entrar pelo `frontend` da aplicação https://caixa-eletronico.vercel.app/
  - Se preferir entrar pelo `backend` abra o navegador no link http://caixaeletronico-env.eba-ira7mxwk.us-east-2.elasticbeanstalk.com/transform?decimal=R$160

### Lógica do desafio

1. O número é decomposto. Exemplo: 1830 -> 1000 / 800 / 30 / 0;
2. Cada número do que decompomos é jogado na árvore binária;
3. A árvore binária tem o objetivo de encontrar a cédula mais adequada ao valor;
  - Regras da pesquisa de cédula mais adequada na árvore binária:
    - Nós disponíveis(Representam as cédulas): 10, 20, 50, 100;
    - Se o número for 0 ou menor que 20 e diferente de 10 não queremos continuar a pesquisa;
    - Se o número for maior do que 100 então a divisão desse número por 100 representa a quantidade de cédulas de 100 que queremos;
    - `[REF01]` Se o número for menor do que 100 porém maior do que 10, 20 ou 50:
      - Se o número for divisível por 10, 20 ou 50:
        - A divisão entre os dois representa a quantidade de cédulas que queremos.
      - Caso contrário:
        - O nó que possui o valor mais próximo do número solicitado é escolhido;
        - O número é subtraído pelo valor do nó do passo anterior;
        - O resultado da operação anterior é jogado na primeira regra de pesquisa.
    - Se o número for igual a um nó automaticamente temos nossa cédula necessária;
    - Se o número for menor que um nó e não tiver passado nos critérios anteriores o percurso em árvore é para esquerda;
    - Se o número for maior que um nó e não tiver passado nos critérios anteriores o percurso em árvore é para direita.
4. O resultado do passo anterior é formatado ao máximo para a resposta esperada.

### Testes

- [x] URL válida;
- [x] Parâmetro válid0;
- [x] Valor do saque múltiplo de 10;
- [x] Teste com os exemplos do site do desafio;

### Conclusões do desafio

- A complexidade em tempo é bem performática tendo notação assintótica O(n);
- Apesar de parecer não muito performático o `n` representa a quantidade de algarismos do número de entrada;
- Pelo ponto anterior podemos perceber que embora consideremos números muito altos ainda assim o código tem potencial escalável;
- A busca em árvore é o core da aplicação e na grande maioria dos casos a notação Big O vai ser de um valor constante ou entre O(1) e O(log n)
- O pior caso da busca pela cédula ideal é quando nós precisamos entrar na condição `[REF01]` porém ainda sim é um valor previsível já que após a subtração qualquer valor originado dessa operação cairá numa das condições das regras de pesquisa.

### Conclusão final

- O Código talvez não seja a melhor escolha para o desafio e o desenvolvimento dele também não. Porém certamente é um código simples, escalável e de fácil manutenção;
- Podemos utilizar a biblioteca `fortio` em conjunto com `Kubernetes` para descobrirmos quantas chamadas a api em sequência são necessárias para derrubar a aplicação e também gerarmos inúmeros valores aleatórios dentro dos critérios que temos para executar testes.
