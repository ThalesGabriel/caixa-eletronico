module.exports = app => {
  const controller = {};
  const transformService = app.services.transformService;

  controller.execTransform = (req, res) => transformService.transformDecimal2Roman(req, res)

  return controller;
}