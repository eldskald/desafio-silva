# Desafio Silva - Rafael de Lima Bordoni

O desafio foi feito com javascript puro, usando TailwindCSS e Jest como bibliotecas apenas. O foco foi em simplicidade, com o mínimo possível de dependências para um processo mais fácil possível para desenvolver e fazer o deploy, que nesse caso foi feito pelo GitHub Pages.

Escolhi o combo clássico de HTML+CSS+JavaScript por dois motivos: foram criadas para fazer interfaces e me permitem um deploy fácil no GitHub Pages. Não quis usar frameworks de frontend ou TypeScript pra evitar a necessidade de um builder, que acredito ser desnecessário para um projeto pequeno, adicionaria muita complexidade, tempo de build, dependências e entre outros. A única excessão para essa regra foi a inclusão do TailwindCSS, que só incluí por viés pessoal mesmo, eu gosto muito de trabalhar com essa biblioteca, mas mesmo assim ela não necessita um builder e nem é uma dependência real, é apenas uma ferramenta CLI para gerar o CSS da página. O comando "build" do projeto é apenas rodar o tailwind/cli. Pode ver no `package.json` que todas as dependências são de desenvolvimento apenas, se resumem a `eslint`, `prettier`, `jest` e `tailwindcss`.

Os testes são feitos com Jest, carregando o DOM e mexendo nele diretamente para simular cliques, checar conteúdo e etc. Talvez eles não sejam testes de unidade na teoria, estão mais para testes de funcionalidade (daqueles que geralmente fazem com cypress e entre outros). Fiz assim porque acredito serem os mais adequados para esse tipo de projeto, os testes não sabem nada sobre a implementação ou os scripts, eles apenas esperam que a interface funcione de uma certa forma e sempre vão pegar quando alguma funcionalidade quebrar.

## Desenvolvimento

É necessário alguma versão do node (do 18 pra cima deve funcionar), com npm para gerenciamento de pacotes.

Clone o repositório, crie o arquivo `.env` copiando o `.env.template` e mudando-o de nome, se quiser pode mudar o valor da variável, ela apenas a porta a ser usada no localhost.

Rode `npm install` para instalar as dependências, depois `npm run build` para gerar o CSS e por último, `npm run dev` para levantar o servidor para acessar a página no localhost, na porta no `.env`. Rode `npm run test` para rodar os testes.
