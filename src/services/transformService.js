const R = require('ramda');
const initAVLTree = require("../utils/binary-tree");
const { validateURL, validateParam } = require("../utils/errorHandler");

module.exports = (app) => {
  const service = {};

  service.transformDecimal2Roman = (req, res) => {
    const { decimal } = req.query;

    validateURL(decimal, res)
    const string_decimal = validateParam(decimal, res)
    const bucks = { 100: 0, 50: 0, 20: 0, 10: 0 };
    const tree = initAVLTree();

    // Decompose Number O(n). Ex: 180 will be 100 and 80. 12650 will be 10000, 2000, 600, 50
    iterator = 0;
    while(iterator < string_decimal.length) {
      let places = (string_decimal.length-1) - iterator
      let dec = string_decimal[iterator] + "0".repeat(places)
      
      // This function will return how many bucks gonna be used to represent each decomposed number
      tree.getValue(bucks, parseInt(dec))
      iterator += 1
    }

    // At this point we have already our answer like:
    console.log(`\nTo ${string_decimal} we gonna need: ${JSON.stringify(bucks)}\n`)

    // Let's turn into a beautiful answer
    const removeEmptyBucks = R.reject(R.equals(0))(bucks);
    const reversed_bucks = Object.keys(removeEmptyBucks).reverse()
    
    let final_answer = `Valor do Saque: R$ ${string_decimal},00 – Resultado Esperado: `

    if(reversed_bucks.length == 1) 
      final_answer += `Entregar ${bucks[reversed_bucks[0]]} nota(s) de R$${key},00`
    else {
      let concatenate = ""
      const initialNotes = reversed_bucks.slice(0,reversed_bucks.length-1)
      
      initialNotes.map(key => {
        if(bucks[key]) 
          concatenate += `entregar ${bucks[key]} nota(s) de R$${key},00` + ", "
      })

      concatenate = concatenate.substr(0, concatenate.length-1)
      concatenate += ` e ${bucks[reversed_bucks[reversed_bucks.length-1]]} nota(s) de R$${reversed_bucks[reversed_bucks.length-1]},00.`
      concatenate = concatenate[0].toUpperCase() + concatenate.substr(1, concatenate.length)
      final_answer += concatenate
    }

    return res.send({ status: 200, message: final_answer });
  };

  return service;
};
