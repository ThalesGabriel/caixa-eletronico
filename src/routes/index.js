module.exports = app => {
  const transformController = app.controllers.transformController;
  
  app.route('/')
    .get((req, res) => res.send("<h2>Hello world!! Go to endpoint like base_url/transform?decimal=R$160</h2>"))

  app.route('/transform')
    .get(transformController.execTransform)
}