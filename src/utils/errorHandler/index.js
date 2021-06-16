const validateURL = (decimal, res) => {
  let message = null;

  if(!decimal) message = "You need to pass a decimal value from URL"
  if(!message) return

  res.send({
    status: 400,
    message,
    example: "base_url/transform?decimal=R$12570,00",
  });

  throw new Error(message)
}

const validateParam = (decimal, res) => {
  let str_dec = String(decimal);
  str_dec = str_dec.slice(2, str_dec.length).split(",")[0]
  let message = null;

  if (str_dec[str_dec.length - 1] != 0) message = "You need to pass multiple from 10"
  if (!message) return str_dec
  
  res.send({
    status: 400,
    message,
    example: "base_url/transform?decimal=R$30,00",
  });
  
  throw new Error(message)
}

module.exports = { validateParam, validateURL }
