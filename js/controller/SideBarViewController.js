class SideBarViewController{
constructor(view, model, generalController) {
   view.expandButton.click(() => {
     view.expand.toggleClass("d-sm-block").toggleClass("d-none");
     if(view.expand.hasClass("d-sm-block")) {
       view.sideBarMobilePrice.show();
     } else {
       view.sideBarMobilePrice.hide();
     }
   })
   
   view.numberOfGuestsSelect.change(() => model.setNumberOfGuests(Number(view.numberOfGuestsSelect.find(":selected").text())))
   view.confirmButton.click(()=> {
     if(!model.isMenuEmpty()) {
       generalController.renderDinnerView()
     }  
   })
 }
}