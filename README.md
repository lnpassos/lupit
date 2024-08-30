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
Não há muitas para tornar a aplicação mais rápida, alguns deles são:
Nome: Apenas STR.
Idade: Apenas INT.
Edit Jogador: Ele não pode ficar sem um time.

____________________________________________________________________________________

## IMPORTANT! 
## Para navegar entre os Endpoints, apenas utilizei o menu fixo do Header, sendo o titulo: `Lupit`.

# Features
Utilizei bibliotecas React / Next no Front-end para tornar algo legal visualmente pro usuário,
uma feature apenas como simulação é o `Spinner de validação`, simulando um `request` para o backend,
fazendo as verificações necessárias, aguardando o `response` para criar o usuário.

`Não há uma validação em volta disso, apenas como simulação`

____________________________________________________________________________________

# Endpoints

`http://localhost:3000/` - Home
`http://localhost:3000/create-team` - Criar novo Time
`http://localhost:3000/create-player` - Criar novo Jogador
`http://localhost:3000/teams` - Mostra todos os Times criados.
`http://localhost:3000/players` - Mostra todos os Jogadores criados.
`http://localhost:3000/teams/8` - Mostra detalhes de um Time em específico.
`http://localhost:3000/players/id` - Mostra detalhes de um Jogador em específico.

