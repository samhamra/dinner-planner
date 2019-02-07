class DishDetailViewController {
  constructor(view, model, generalController) {
    view.backButton.click(() => generalController.renderDishSearch())
    view.addButton.click(() => {
      model.addDishToMenu(view.currentDish)
      generalController.renderDishSearch();
    });
  }
}
