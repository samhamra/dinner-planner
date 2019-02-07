class DinnerOverView {
    constructor (container, model) {
	     this.container=container;
	     this.model=model;
       this.printButton = $(container).find("#print-button");
       this.menuContainer = $(container).find("#selected-menu")
       this.totalPriceTag = $(container).find("#totalPriceTag");
       model.addObserver(this);

    }
    update(model, changeDetails){
      if(changeDetails !== 2) {
        this.menuContainer.empty();
        let dishes = model.getFullMenu();
        dishes.forEach(dish => {
              this.menuContainer.append(this.itemDishView(dish));
        })
        //let numberOfSelections = model.getNumberOfSelections();
        //this.menuContainer.children().first().addClass('offset-sm-' + (3 + (3-numberOfSelections)*2))
        this.totalPriceTag.html(model.getTotalMenuPrice());
      }
    }
    
    itemDishView(dish) {
      let price = dish.extendedIngredients.length*this.model.getNumberOfGuests();
      return `
      <div class="col-xs-12 col-sm-3 dish-item-print">
        <image class="dish-image" src='${dish.image}'></image>
        <p class="dish-name">${dish.title}</p>
        <p data-single-amount="${dish.extendedIngredients.length}" class="variable dish-price">${price}</p>
      </div>
      `;
    }
    
    // in lab 2, the Observer update method will come here
}
 
