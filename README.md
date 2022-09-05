# Projeto-18---Valex
Criação do  Cartão
  Requisição: post 
  Rota: localhost:5000/cardCreate
  header: Bearer ', 'x-api-key'
  body:{
    "id":2, //id funcionario
    "type":"education" //O tipo do cartão
  }
Ativação de cartão
  Requisição: put 
  Rota:localhost:5000/ativacaoCartao
  body:{
    "senha":"1112",
    "id":14, //id do cartão
    "cvc":"5549"
  }
Visualização de saldo e transações
   Requisição: get
   Rota:localhost:5000/cartaoVisualizacao
   body:{"id":6}//id do cartão
Bloqueio de cartão
   Requisição: get
   Rota:localhost:5000/cartaoBloquear
   body:{
      "id":6,//id do cartão
      "senha":"1111"
    }
Desbloqueio de cartão
    Requisição: put 
    Rota:localhost:5000/cartaoDesbloquear
      body:{
        "id":6,//id do cartão
        "senha":"1111"
      }
Recarga
  Requisição: post 
  Rota:localhost:5000/recargas
   body:{
          "id":6,//id do cartão
          "valor":5 // valor da recarga do cartao
        }
Compras
   Requisição: post 
   Rota: localhost:5000/compras
    body:{
       "valor":1,
        "id":6,//id do cartão
        "idloja":2, //id da empresa
        "senha":"1111"
    }
