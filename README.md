Contexto: Uma empresa está desenvolvendo um sistema de gerenciamento de produtos e precisa de uma aplicação que permita cadastrar, atualizar, listar e excluir produtos. Além disso, cada vez que um produto for deletado ou atualizado.

precisam implementar dois tipos de cadastro cadastro de usuários e cadastro de produtos.

Tarefas
Criação do MVC duas páginas que chamará cada formulário de cadastro, uma página para cadastro de produtos e outra para cadastro de usuários

Criação para Produtos:
Implementar os endpoints CRUD para gerenciar produtos no banco de dados MySQL. Esses endpoints devem chamar os controllers que irá realizar operações de validação dos dados de entrada, como:
Obrigatórios
O nome do produto deve ter no mínimo 3 caracteres.
O preço deve ser um valor positivo.
O estoque deve ser um número inteiro maior ou igual a zero.

Endpoints:
GET /produtos: Retornar todos os produtos.
GET /produtos/{id}: Retornar o produto com o ID especificado.
POST /produtos: Criar um novo produto (com validação de campos).
PUT /produtos/{id}: Atualizar os dados de um produto existente (com validação de campos).
DELETE /produtos/{id}: Excluir o produto com o ID especificado.

GET /usuarios: Retornar todos os usuarios.
GET /usuarios/{id}: Retornar o usuario com o ID especificado.
POST /usuarios: Criar um novo usuario (com validação de campos).
PUT /usuarios/{id}: Atualizar os dados de um usuario existente (com validação de campos).
DELETE /usuarios/{id}: Excluir o usuario com o ID especificado.

Teste dos Endpoints:
Vocês devem testar cada endpoint usando o Postman e incluir capturas de tela dos testes no documento de entrega.

Relatório Técnico em word ou PDF ou um readme para o Github do projeto, escolha uma dessas opções:
Incluir um relatório final explicando como a aplicação foi desenvolvida, como funciona o MVC e suas múltiplas formas de utilização foram implementados, e como a validação dos campos funciona.
Destaquem também as principais dificuldades encontradas e as soluções adotadas.
e coloque as referências utilizadas
