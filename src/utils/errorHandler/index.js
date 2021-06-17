const formError = (message, res, example = "base_url/transform?decimal=R$12570,00") => {
  const jsonError =  {
    status: 400,
    message,
    example,
  }

  if(!res) return jsonError
  else {
    res.send(jsonError);
    throw new Error(message);
  }
}

const validateURL = (decimal, res = null) => {
  let message = null;
  if(!decimal) message = "You need to pass a decimal value from URL"
  if(!message) return

  return formError(message, res)
}

const validateParam = (decimal, res = null) => {
  let str_dec = String(decimal);
  let message = null;
  
  if(!Boolean(str_dec)) return formError("You need to pass a decimal value from URL", res)
  if(!str_dec.startsWith("R$")) return formError("You need to pass a valid decimal value from URL", res)
  str_dec = str_dec.slice(2, str_dec.length).split(",")[0]
  if(!Boolean(str_dec)) return formError("You need to pass a decimal value from URL", res)
  if (str_dec[str_dec.length - 1] != "0") return formError("You need to pass multiple from 10", res)
  if (!message) return {status: 200, str_dec}
  
  return formError("You need to pass multiple from 10", res, "base_url/transform?decimal=R$30,00")
}

module.exports = { validateParam, validateURL }
