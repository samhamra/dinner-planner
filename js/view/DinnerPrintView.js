class DinnerPrintView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    model.addObserver(this);
  }
  update(model, changeDetails) {
    if (changeDetails === 1) {
      $(this.container).empty();
      let dishes = model.getFullMenu();
      dishes.forEach(dish => {
        $(this.container).append(this.getDishView(dish));
      })
    }
  }
  getDishView(dish) {
    return (
      `
    <div class="row margin-bottom">
      <div class="col-xs-12 col-sm-2">
        <img class="myimage" src="${dish.image}" alt="">
      </div>
      <div class="col-xs-12 col-sm-5">
        <div class="side-pad">
          <h4 class="description-header">${dish.title}</h4>
          <p>${dish.summary}</p>
        </div>
      </div>
      <div class="col-xs-12 col-sm-5">
        <div class="side-pad">
          <h4 class="description-header">Preparation</h4>
          <p>${dish.instructions ? dish.instructions : "Instructions missing for this recipe"}</p>
        </div>
      </div>
    </div>
    `
    )
  }
  // in lab 2, the Observer update method will come here
}