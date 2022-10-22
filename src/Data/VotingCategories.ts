

export function getVotingCategoriesData() {

  // Remember ID:0 = 'Null' > reserved vote id!

  return {
    lanches: {
      digits: 2,
      candidates: [
        {Id: 11, Nome: "Hamburguer", Partido: "Breadzil", pictureUrl: "burguer.png"},
        {Id: 22, Nome: "Pizza", Partido: "Brapzza", pictureUrl: "pizza.png"},
        {Id: 33, Nome: "Pastel", Partido: "Massa", pictureUrl: "pastel.png"}
      ]
    },
    bebidas: {
      digits: 3,
      candidates: [
        {Id: 444, Nome: "Refrigerante", Partido: "RefriBra", pictureUrl: "refri.png"},
        {Id: 777, Nome: "Suco", Partido: "Frutas", pictureUrl: "suco.png"},
        {Id: 999, Nome: "Água", Partido: "Potável", pictureUrl: "agua.png"}
      ]
    },
    // automoveis: { //Basta descomentar isso para funcionar!
    //   digits: 4,
    //   candidates: [
    //     {Id: 1111, Nome: "Carro", Partido: "Combustão"},
    //     {Id: 2222, Nome: "Bicicleta", Partido: "Ambiente"},
    //     {Id: 3333, Nome: "Aviao", Partido: "Nuvem"}
    //   ]
    // }
  }
}