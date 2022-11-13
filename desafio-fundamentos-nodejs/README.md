<h1 align="center">
  👨🏻‍🚀 Fundamentos - Node.js
</h1>

### ✔️ Específicação dos testes

Para esse desafio temos os seguintes testes:

- **`should be able to create a new transaction`**: Para que esse teste passe, sua aplicação deve permitir que uma transação seja criada, e retorne um json com a transação criado.

- **`should be able to list the transactions`**: Para que esse teste passe, sua aplicação deve permitir que seja retornado um objeto contendo todas as transações junto ao balanço de income, outcome e total das transações que foram criadas até o momento.

- **`should not be able to create outcome transaction without a valid balance`**: Para que esse teste passe, sua aplicação não deve permitir que uma transação do tipo `outcome` extrapole o valor total que o usuário tem em caixa, retornando uma resposta com código HTTP 400 e uma mensagem de erro no seguinte formato: `{ error: string }`

## 🚀 Instalação e execução

1. Faça um clone desse repositório;</br>
   git clone https://github.com/matheusguermandi/fundamentos-nodejs.git
   
2. Com o terminal aberto, verifique se está na pasta `fundamentos-nodejs`;</br>
   Caso não esteja execute o comando `cd fundamentos-nodejs`
   
3. Execute `yarn` para realizar a instalação das dependencias;

4. Execute `yarn dev:server` para realizar a inicialização da aplicação;

5. Execute `yarn test` caso queira rodar os testes automatizados.

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.
