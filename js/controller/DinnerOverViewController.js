class DinnerOverViewController {
  constructor(view, model, generalController) {
    this.view = view;
    this.model = model;
    view.printButton.click(() => {
      generalController.renderDinnerPrint()
    })
  }
}