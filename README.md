# caixa-eletronico

#### Esse desafio foi realizado seguindo as regras padrão estabelecidas pelo site [Dojo Puzzles](https://dojopuzzles.com/problems/caixa-eletronico/)

#### Características do desafio
- [x] Entregar o menor número de notas;
- [x] É possível sacar o valor solicitado com as notas disponíveis;
- [x] Saldo do cliente infinito;
- [x] Quantidade de notas infinito;
- [x] Notas disponíveis de R$ 100,00; R$ 50,00; R$ 20,00 e R$ 10,00.;
- [ ] valor finito de cédulas para aumentar a dificuldade do problema).

### Exemplo de Resposta

- Exemplo = R$30,00;
- Resposta API = Valor do Saque: R$ 30,00 – Resultado Esperado: Entregar 1 nota(s) de R$20,00, e 1 nota(s) de R$10,00.
- Resposta esperada pelo desafio = Valor do Saque: R$ 30,00 – Resultado Esperado: Entregar 1 nota de R$20,00 e 1 nota de R$ 10,00.

### Características do desafio

- Foi criado utilizando NodeJs como framework **JavaScript**;
- Foram utilizadas as seguintes libs:
  - [x] config -> Alternativa ao `.env`;
  - [x] consign -> Carrega os arquivos que são especificados de maneira automática em toda aplicação;
  - [x] express -> Levantar o servidor http;
  - [x] ramda -> Operações com listas.
- Utiliza uma árvore binária balanceada conhecida como AVL para realizar nossas operações.

### Lógica do desafio

1. O número é decomposto. Exemplo: 1830 -> 1000 / 800 / 30 / 0;
2. Cada número do que decompomos é jogado na árvore binária;
3. A árvore binária tem o objetivo de encontrar a cédula mais adequada ao valor;
  - Regras da pesquisa do valor na árvore binária:
    - Nós disponíveis(Representam as cédulas): 10, 20, 50, 100;
    - Se o número for 0 ou menor que 20 e diferente de 10 não queremos continuar a pesquisa;
    - Se o número for maior do que 100 então a divisão desse número por 100 representa a quantidade de cédulas de 100 que queremos;
    - `[REF01]` Se o número for menor do que 100 porém maior do que 10, 20 ou 50:
      - Se o número for divisível por 10, 20 ou 50:
        - A divisão entre os dois representa a quantidade de cédulas que queremos.
      - Caso contrário:
        - A cédula que possui o valor mais próximo do número solicitado é escolhida;
        - O número é subtraído pelo valor da cédula mais próxima;
        - O resultado da operação anterior é jogado na primeira regra de pesquisa.
    - Se o número for igual a um nó automaticamente temos nossa cédula necessária;
    - Se o número for menor que um nó e não tiver passado nos critérios anteriores o percurso em árvore é para esquerda;
    - Se o número for maior que um nó e não tiver passado nos critérios anteriores o percurso em árvore é para direita.
4. O resultado do passo anterior é formatado ao máximo para a resposta esperada.

### Testes

- [ ] URL válida;
- [ ] Valor do saque múltiplo de 10;
- [ ] Resposta esperada de R$30,00 = "Valor do Saque: R$ 30,00 – Resultado Esperado: Entregar 1 nota(s) de R$20,00, e 1 nota(s) de R$10,00.";
- [ ] Fortio para teste de stress.

### Conclusões do desafio

- A complexidade em tempo é bem performática tendo notação assintótica O(n);
- Apesar de parecer não muito performático o `n` representa a quantidade de algarismos de um número;
- Pelo ponto anterior podemos perceber que embora consideremos números muito altos ainda assim o código tem potencial escalável;
- A busca em árvore é o core da aplicação e pelo fato da busca em árvore ter notação O(1) no pior caso, visto que temos apenas 4 nós, é bem performática;
- O pior caso da busca pela cédula ideal é quando nós precisamos entrar na condição `[REF01]` porém ainda sim é um valor previsível já que após a subtração qualquer valor originado dessa operação cairá numa das condições das regras de pesquisa.

### Conclusão final

- O Código talvez não seja a melhor escolha para o desafio e o desenvolvimento dele também não. Porém certamente é um código simples, escalável e de fácil manutenção;
- Podemos utilizar a biblioteca `fortio` em conjunto com kubernetes para descobrirmos quantas chamadas a api em sequência são necessárias para derrubar a aplicação.


