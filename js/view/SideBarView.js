class SideBarView {
    constructor (container, model) {
	    this.container=container;
	    this.model=model;
	    this.numberOfGuestsSelect = $(container).find("#numberOfGuestsSelect");
      this.expandButton = $(container).find("#expand-button");
      this.expand = $(container).find(".hide");
      this.cart = $(container).find("#cart-container");
      this.totalPriceContainer = $(container).find("#total-price-container");
      this.totalPriceTag = $(container).find("#total-price-tag");
      this.confirmButton = $(container).find("#confirm-button");
      this.sideBarMobilePrice = $(container).find(".sidebar-price");
      this.cartContainer = $(container).find('#cart-container');
      model.addObserver(this);
    }
    
    update(model, changeDetails){
      let fullPrice = this.model.getTotalMenuPrice()
      switch(changeDetails) {
        case 0:
        this.totalPriceTag.html(fullPrice);
        if(!model.isMenuEmpty()) {
          this.sideBarMobilePrice.html(fullPrice+ " SEK");
        }
        let guests = this.model.getNumberOfGuests();
        this.cartContainer.find('.variable').each((i, e) => {
          if (e.hasAttribute("data-single-amount")) {
            e.innerHTML = e.getAttribute("data-single-amount") * guests;
          } else {
            e.innerHTML = guests;
          }
        })
        break;
        case 1:
          if(model.isMenuEmpty()) {
            this.confirmButton.addClass("blur");
            this.sideBarMobilePrice.html("");
          } else {
            this.confirmButton.removeClass("blur");
            this.sideBarMobilePrice.html(fullPrice+ " SEK");
          }
          this.cart.find('.cart-data').remove()
          let menu = model.getFullMenu();
          menu.forEach(dish => {
            this.totalPriceContainer.before(this.cartItem(dish))
          })
          this.totalPriceTag.html(fullPrice);
        break;
      }
    }
    
    cartItem(dish) {
      var price = dish.extendedIngredients.length*this.model.getNumberOfGuests();
      return `
        <div class="cart-data-row cart-data">
          <p class="cart-cell">${dish.title}</p>
          <p data-single-amount="${dish.extendedIngredients.length}" class="cart-cell variable">${price}</p>
        </div>
      `;
    } 
  
    // in lab 2, the Observer update method will come here
}
 
