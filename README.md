# DOCUMENTAÇÃO
Após fazer o download do projeto via `.zip` ou `git clone`, siga os passos abaixo:

1. **Entre na pasta `Frontend`:**

   cd Frontend<br><br>
   Instale as dependências do projeto:<br>
   `npm install`
   
   Inicie o servidor de desenvolvimento:<br>
   `npm run dev`
   
____________________________________________________________________________________

2. **Entre na pasta `Backend`:**
   
   cd ../Backend<br><br>
   Instale as dependências do projeto:<br>
   `npm install`
   
   Inicie o servidor:<br>
   `npm run start`
   
____________________________________________________________________________________

# Validações
Não há muitas, para tornar a aplicação mais rápida. Algumas delas são:<br>
`Idade`: Apenas INT.<br>
`Edit Jogador`: Ele não pode ficar sem um time.<br>
`Conexão com o SERVIDOR`, inicie apenas o Frontend, ao tentar entrar /Players ou /Teams, retornará mensagem de erro, dizendo que não foi possivel se conectar ao Servidor.<br>
OBS: Apenas fiz uma validação customizada para esses dois Endpoints


____________________________________________________________________________________

# Features
Utilizei bibliotecas React / Next no Front-end para tornar o projeto mais dinâmico e melhor visualmente pro usuário,
um exemplo de feature é o `Spinner de validação`, simulando um `request` para o backend,
fazendo as verificações necessárias, aguardando o `response` para criar um `Player / Team`.

____________________________________________________________________________________

# Endpoints

`http://localhost:3000/` - Home<br>
`http://localhost:3000/create-team` - Criar novo Time<br>
`http://localhost:3000/create-player` - Criar novo Jogador<br>
`http://localhost:3000/teams` - Mostra todos os Times criados.<br>
`http://localhost:3000/players` - Mostra todos os Jogadores criados.<br>
`http://localhost:3000/teams/8` - Mostra detalhes de um Time em específico.<br>
`http://localhost:3000/players/id` - Mostra detalhes de um Jogador em específico.

