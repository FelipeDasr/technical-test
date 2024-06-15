# Teste Técnico - Desenvolvedor Backend Pleno

Olá, este é o teste que nós utilizamos para avaliar tecnicamente todas as pessoas que estão participando do processo seletivo para a vaga.

### Instruções.
Você deverá criar um **fork** deste projeto, e desenvolver em cima do seu fork. Use o **README** principal do seu repositório para nos contar como foi resolver seu teste, as decisões tomadas, como você organizou e separou seu código, e principalmente as instruções de como rodar seu projeto, afinal a primeira pessoa que irá rodar seu projeto será um programador backend de nossa equipe, e se você conseguir explicar para ele como fazer isso, você já começou bem!

Mostre que você é bom e nos impressione, mas não esqueça do objetivo do projeto.

### Desafio.
Este teste foi projetado para avaliar suas habilidades em Node.js e gerenciamento de banco de dados. O objetivo é criar uma API RESTful funcional simulando um marketplace com foco em boas práticas de desenvolvimento, desempenho e segurança.

### Requisitos.
1. **Produtos**:
   - **Criar Produto**: Endpoint para criar um novo produto com nome, descrição, categoria e preço.
   - **Listar Produtos**: Endpoint para listar todos os produtos com filtros por categoria e faixa de preço.
   - **Detalhar Produto**: Endpoint para obter os detalhes de um produto específico.
   - **Atualizar Produto**: Endpoint para atualizar informações de um produto.
   - **Excluir Produto**: Endpoint para excluir um produto.

2. **Categorias**:
   - **Criar Categoria**: Endpoint para criar uma nova categoria.
   - **Listar Categorias**: Endpoint para listar todas as categorias.
   - **Detalhar Categoria**: Endpoint para obter os detalhes de uma categoria específica.
   - **Atualizar Categoria**: Endpoint para atualizar informações de uma categoria.
   - **Excluir Categoria**: Endpoint para excluir uma categoria.

3. **Carrinho de Compras**:
   - **Adicionar ao Carrinho**: Endpoint para adicionar produtos ao carrinho de compras.
   - **Remover do Carrinho**: Endpoint para remover produtos do carrinho de compras.
   - **Visualizar Carrinho**: Endpoint para visualizar os produtos no carrinho de compras.
   - **Checkout**: Endpoint para finalizar a compra dos produtos no carrinho (Nessa etapa não precisa conectar com nenhum método de pagamento, somente receber as informações dos produtos e registrar a compra).

4. **Banco de Dados**: Use MongoDB ou PostgreSQL.
5. **Autenticação e Autorização**: Implemente autenticação JWT e autorize apenas usuários autenticados a manipular os dados.

### O que nós esperamos do seu teste.
1. **Organização do Código**: Estrutura do projeto e clareza do código.
2. **Funcionalidade**: Todos os requisitos funcionais devem ser atendidos.
3. **Desempenho**: A API deve ser eficiente e rápida.
4. **Segurança**: Implementação correta de autenticação e autorização.
5. **Boas Práticas**: Código limpo, reutilizável e seguindo as melhores práticas de desenvolvimento.
6. **Documentação**: README claro e detalhado, explicando como rodar a aplicação e qualquer outro detalhe relevante.

### O que nós ficaríamos felizes de ver em seu teste.
- Implementação de testes unitários e/ou de integração.
- Documentação no **swagger** da API.
- Utilização de alguma arquitetura no backend e a explicação do motivo da escolha dessa arquitetura.

### O que nós não gostaríamos.
- Descobrir que não foi você quem fez seu teste.
- Ver commits grandes, sem muita explicação nas mensagens em seu repositório.