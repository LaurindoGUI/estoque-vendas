const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let estoque = [
  { produto: 'Camiseta', quantidade: 50, preco: 29.90 },
  { produto: 'Calça', quantidade: 30, preco: 79.90 },
  { produto: 'Tênis', quantidade: 20, preco: 199.90 },
];


function venderProduto(nomeProduto, quantidadeVendida) {
  let produto = estoque.find(item => item.produto.toLowerCase() === nomeProduto.toLowerCase());
  
  if (produto) {
    if (produto.quantidade >= quantidadeVendida) {
      produto.quantidade -= quantidadeVendida;
      let totalVenda = quantidadeVendida * produto.preco;
      console.log(`Venda realizada: ${quantidadeVendida} x ${produto.produto}. Total: R$${totalVenda.toFixed(2)}`);
    } else {
      console.log('Quantidade insuficiente no estoque.');
    }
  } else {
    console.log('Produto não encontrado.');
  }
}


function adicionarEstoque(nomeProduto, quantidadeAdicionada) {
  let produto = estoque.find(item => item.produto.toLowerCase() === nomeProduto.toLowerCase());
  
  if (produto) {
    produto.quantidade += quantidadeAdicionada;
    console.log(`Estoque de ${produto.produto} atualizado. Nova quantidade: ${produto.quantidade}`);
  } else {
    console.log('Produto não encontrado.');
  }
}


function consultarEstoque() {
  console.log('Estoque atual:');
  estoque.forEach(item => {
    console.log(`Produto: ${item.produto}, Quantidade: ${item.quantidade}, Preço: R$${item.preco.toFixed(2)}`);
  });
}


function mostrarMenu() {
  rl.question('Escolha uma operação: \n1 - Vender Produto \n2 - Adicionar ao Estoque \n3 - Consultar Estoque \n4 - Sair\nEscolha: ', (opcao) => {
    switch (opcao) {
      case '1':
        rl.question('Informe o nome do produto: ', (nomeProduto) => {
          rl.question('Informe a quantidade vendida: ', (quantidadeVendida) => {
            venderProduto(nomeProduto, parseInt(quantidadeVendida));
            mostrarMenu();
          });
        });
        break;
      case '2':
        rl.question('Informe o nome do produto: ', (nomeProduto) => {
          rl.question('Informe a quantidade a ser adicionada: ', (quantidadeAdicionada) => {
            adicionarEstoque(nomeProduto, parseInt(quantidadeAdicionada));
            mostrarMenu();
          });
        });
        break;
      case '3':
        consultarEstoque();
        mostrarMenu();
        break;
      case '4':
        console.log('Saindo...');
        rl.close();
        break;
      default:
        console.log('Opção inválida. Tente novamente.');
        mostrarMenu();
        break;
    }
  });
}

mostrarMenu();
