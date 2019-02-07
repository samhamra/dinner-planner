class DishDetailView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.currentDish;
    this.dishName = $(container).find("#dish-name");
    this.dishImage = $(container).find("#dish-image");
    this.dishDescription = $(container).find("#dish-description");
    this.dishPreparation = $(container).find("#dish-preparation");
    this.numberOfGuests = $(container).find("#numberOfGuests");
    this.tableEntryPoint = $(container).find("thead");
    this.table = $(container).find("#ingredient-list");
    this.totalPriceTag = $(container).find("#totalPriceTag");
    this.addButton = $(container).find("#add-button");
    this.backButton = $(container).find("#back-button");
    model.addObserver(this);
  }

  update(model, changeDetails) {
    let guests = this.model.getNumberOfGuests();
    switch (changeDetails) {
      case 0:
        if(!this.currentDish) {
          return;
        }
        this.numberOfGuests.html(guests)
        this.table.find('.variable-td').each((i, e) => {
          if (e.hasAttribute("data-single-amount")) {
            e.innerHTML = e.getAttribute("data-single-amount") * guests
          } else {
            e.innerHTML = guests;
          }
        })
        this.totalPriceTag.html(this.currentDish.extendedIngredients.length * guests);
        break;
      case 2:
        let dish = this.model.getCurrentSelection()
        let body = $("body");
        body.addClass("loading");
        Promise.all([this.model.getDish(dish.id), this.model.getDishSummary(dish.id)]).then(res => {
          this.dishName.html(res[0].title);
          res[0].summary = res[1].summary;
          this.currentDish = res[0];
          this.dishImage.attr("src", res[0].image);
          this.numberOfGuests.html(guests)
          $(this.container).find(".recipe-data").remove();
          res[0].extendedIngredients.forEach((ingredient) => {
            this.tableEntryPoint.after(this.tableRow(ingredient, guests));
          })
          this.dishDescription.html(res[0].summary);
          if (res[0].instructions) {
            this.dishPreparation.html(res[0].instructions)
          } else {
            this.dishPreparation.html("Instructions missing for this recipe")
          }
          this.totalPriceTag.html(res[0].extendedIngredients.length * guests);
          body.removeClass("loading");
        }).catch(error => {
          body.removeClass("loading");
          alert("Network failure, please try again later!")
        })

        break;
    }
  }

  tableRow(ingredient, guests) {
    let price = 1;
    var html = `
      <tr class="recipe-data">
        <td class="variable-td" data-single-amount=${ingredient.amount}>${ingredient.amount*guests}</td>
        <td>${ingredient.unit}</td>
        <td>${ingredient.name}</td>
        <td>SEK</td>
        <td class="variable-td">${guests}</td>
      </tr>
    `;
    return html;
  }
  // in lab 2, the Observer update method will come here
}