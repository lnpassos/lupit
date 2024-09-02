# DOCUMENTAÇÃO
Após ter o projeto em sua máquina, siga os passos abaixo:

1. **Entre na pasta `Frontend`:**

   cd Frontend<br><br>
   Instale as dependências do projeto:<br>
   <b>`npm install`</b>
   
   Inicie o servidor de desenvolvimento:<br>
   <b>`npm run dev`</b>
   
____________________________________________________________________________________

2. **Entre na pasta `Backend`:**
   
   cd ../Backend<br><br>
   Instale as dependências do projeto:<br>
   <b>`npm install`</b>
   
   Inicie o servidor:<br>
   <b>`npm run start`</b>
   
____________________________________________________________________________________

# Validações
Não há muitas, para tornar a aplicação mais rápida. Algumas delas são:<br><br>
<b>`Idade`</b>: Apenas INT.<br><br>
<b>`Edit Jogador`</b>: Ele não pode ficar sem um time.<br><br>
<b>`Conexão com o SERVIDOR`</b>, inicie apenas o Frontend, ao tentar entrar <b>/Players</b> ou <b>/Teams</b>, retornará mensagem de erro, dizendo que não foi possivel se conectar ao Servidor.<br>
<b>OBS: Apenas fiz uma validação customizada para esses dois Endpoints</b>


____________________________________________________________________________________

# Features
Utilizei bibliotecas React / Next no Front-end para tornar o projeto mais dinâmico e melhor visualmente pro usuário,
um exemplo de feature é o <b>`Spinner de validação`</b>, simulando um <b>`request`</b> para o backend,
fazendo as verificações necessárias, aguardando o <b>`response`</b> para criar um <b>`Player`</b> ou <b>`Team`</b>

____________________________________________________________________________________

# Endpoints

`http://localhost:3000/` - Home<br>
`http://localhost:3000/create-team` - Criar novo Time<br>
`http://localhost:3000/create-player` - Criar novo Jogador<br>
`http://localhost:3000/teams` - Mostra todos os Times criados.<br>
`http://localhost:3000/players` - Mostra todos os Jogadores criados.<br>
`http://localhost:3000/teams/id` - Mostra detalhes de um Time em específico.<br>
`http://localhost:3000/players/id` - Mostra detalhes de um Jogador em específico.

