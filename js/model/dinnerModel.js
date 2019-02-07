class Observable {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  notifyObservers(changeDetails) {
    for (var i = 0; i < this._observers.length; i++) {
      this._observers[i].update(this, changeDetails);
    }
  }

  removeObserver(observer) {
    for (var i = 0; i < this._observers.length; i++) {
      if (this._observers[i] === observer) {
        this._observers.splice(i, 1);
      }
    }
  }
}




//DinnerModel Object constructor
class DinnerModel extends Observable {
  constructor() {
    super()
    this.dishes;
    this.amountOfGuests = 1;
    this.selectedDishes = [];
    this.currentSelection = 1;
    this.types = ['starter', 'main dish', 'dessert'];
  }
  //TODO Lab 1 implement the data structure that will hold number of guest
  // and selected dishes for the dinner menu
  // changedetails for observers, 0: guess, 1: menu, 2: currentSelection
  getNumberOfSelections() {
    let selections = 0;
    this.selectedDishes.forEach(function(selection) {
      if (selection !== null) {
        selections++;
      }
    })
    return selections;
  }
  isMenuEmpty() {
    let empty = true;
    this.selectedDishes.forEach(function(selection) {
      if (selection !== null) {
        empty = false;
      }
    })
    return empty;
  }
  getTypes() {
    return this.types;
  }
  setCurrentSelection(dish) {
    this.currentSelection = dish;
    this.notifyObservers(2)
  }
  
  getCurrentSelection() {
    return this.currentSelection;
  }
  
  setNumberOfGuests(num) {
    this.amountOfGuests = num;
    this.notifyObservers(0)
  }

  getNumberOfGuests() {
    return this.amountOfGuests;
    //TODO Lab 1
  }

  addSelectionToMenu() {
    this.selectedDishes.push(this.currentSelection)
    //this.addDishToMenu(this.currentSelection)
    this.notifyObservers(1)
  }
  
  //Returns the dish that is on the menu for selected type 
  getSelectedDish(type) {
    var index = this.types.findIndex((t) => (t === type))
    return selectedDishes[index];
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    return this.selectedDishes;
    //TODO Lab 1
  }


  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  OldgetTotalMenuPrice() {
    var ingredients = this.getAllIngredients();
    var price = 0;
    ingredients.forEach(function(ingredient) {
      price += ingredient.price;
    })
    price *= this.getNumberOfGuests();
    return price;
  }
  
  getTotalMenuPrice() {
    if(this.selectedDishes.length === 0) {
      return 0;
    }
    return this.selectedDishes.map(dish => dish.extendedIngredients.length).reduce((a,b) => a+b)*this.getNumberOfGuests();
  }
  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    var ingredients = [];
    this.selectedDishes.forEach(function(dish) {
      if (dish != null) {
        ingredients = ingredients.concat(dish.ingredients);
      }
    })
    return ingredients;
  }



  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  OldaddDishToMenu(id) {
    let dish = this.getDish(id);
    var index = this.types.findIndex((t) => (t === dish.type))
    this.selectedDishes[index] = dish;
  }
  
  addDishToMenu(dish) {
    this.selectedDishes.push(dish);
    this.notifyObservers(1)
  }

  OldgetDishPrice(id) {
    let dish = this.getDish(id);
    return dish.ingredients.map(a => a.price).reduce((a, b) => (a + b));
  }
  //Removes dish from menu
  removeDishFromMenu(id) {
    let dish = this.getDish(id);
    var index = this.types.findIndex((t) => (t === dish.type))
    this.selectedDishes[index] = null;
    this.notifyObservers(1)
  }



  getAllDishes(type, filter) {
      return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=${filter}&type=${type}`, {
          headers: {
            "X-Mashape-Key": "EQLTqSWbCEmshK4TXyvRenrtEd7tp1uOcIDjsnTZvRiqqjbLLb"
          }
        })
        .then((response) => this.handleHTTPError(response))
        .then(response => response.json())
        .then(response => response.results)
        .catch(error => console.log(error))
  }
  //function that returns a dish of specific ID

  getDishSummary(id) {
    return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/summary`, {
        headers: {
          "X-Mashape-Key": "EQLTqSWbCEmshK4TXyvRenrtEd7tp1uOcIDjsnTZvRiqqjbLLb"
        }
      }).then(response => this.handleHTTPError(response))
      .then(response => response.json())
  }

  getDish(id) {
    return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information`, {
        headers: {
          "X-Mashape-Key": "EQLTqSWbCEmshK4TXyvRenrtEd7tp1uOcIDjsnTZvRiqqjbLLb"
        }
      })
      .then(response => this.handleHTTPError(response))
      .then(response => response.json())
  }


  handleHTTPError(response) {
    if (response.ok) {
      return response;
    }
    throw Error(response.statusText);
  }
}