class TopBarView {
  constructor (container, model) {
     this.container=container;
     this.model=model;
     this.numberOfGuests = $(this.container).find("#numberOfGuests");
     this.returnButton = $(this.container).find("#return");
     model.addObserver(this);
     

  }
  update(model, changeDetails){
    if(changeDetails === 0) {
      $(this.container).find("#numberOfGuests").html(model.getNumberOfGuests())
    } 
  } 
  // in lab 2, the Observer update method will come here
}