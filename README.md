# DOCUMENTAÇÃO

Após fazer o download do projeto via `.zip` ou `git clone`, siga os passos abaixo:

1. **Entre na pasta `Frontend`:**

   cd Frontend
   Instale as dependências do projeto:
   npm install
   
   Inicie o servidor de desenvolvimento:
   npm run dev
   
____________________________________________________________________________________

2. **Entre na pasta `Backend`:**
   
   cd ../Backend
   Instale as dependências do projeto:
   npm install
   
   Inicie o servidor:
   npm run start
   
____________________________________________________________________________________

# Validações

Não há muitas para tornar a aplicação mais rápida, alguns deles são:
Nome: Apenas STR.
Idade: Apenas INT.
Edit Jogador: Ele não pode ficar sem um time.

____________________________________________________________________________________

# Features
## IMPORTANT! 
Para navegar entre os Endpoints, apenas utilizei o menu fixo do Header, sendo o titulo: `Lupit`.

Utilizei bibliotecas React / Next no Front-end para tornar algo legal visualmente pro usuário,
uma feature apenas como simulação é o `Spinner de validação`, simulando um `request` para o backend,
fazendo as verificações necessárias, aguardando o `response` para criar o usuário.

`Não há uma validação em volta disso, apenas como simulação`
