 class TopBarViewController{
 constructor(view, model, generalController) {
    view.returnButton.click(() => generalController.renderDishSearch())
  }
}
 