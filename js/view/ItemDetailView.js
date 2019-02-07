class ItemDetailView {
  constructor(container, model, data) {
    this.container = container;
    this.model = model;
    this.data = data;
    this.render();
  }
  render() {
    let html =  `
      <div class="col-xs-12 col-sm-4 col-md-3 dish-item" id='dish-${this.data.id}'>
        <img class="dish-image" src='https://spoonacular.com/recipeImages/${this.data.image}'></img>
        <p class="dish-name">${this.data.title}</p>
      </div>
    `;
    this.container.append($(html));
  }
}