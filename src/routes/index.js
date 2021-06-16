module.exports = app => {
  const transformController = app.controllers.transformController;
  
  app.route('/transform')
    .get(transformController.execTransform)
}