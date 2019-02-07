class FrontPageViewController{
constructor(view, model, generalController) {
   view.createDinnerButton.click(() => generalController.renderDishSearch())
 }
}