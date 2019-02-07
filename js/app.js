window.onload= function() {
	new GeneralStateController();
};

class GeneralStateController {
	
	constructor() {
		this.model = new DinnerModel();
		this.frontPageView = new FrontPageView(document.querySelector("#frontPageView"));
		this.frontPageViewController = new FrontPageViewController(this.frontPageView, this.model, this);
		this.sideBarView = new SideBarView(document.querySelector("#sideBarView"), this.model);
		this.sideBarViewController = new SideBarViewController(this.sideBarView, this.model, this);
		this.topBarView = new TopBarView(document.querySelector("#topBarView"), this.model);
		this.topBarViewController = new TopBarViewController(this.topBarView, this.model, this);
		this.dishSearchView = new DishSearchView(document.querySelector("#dishSearchView"), this.model, this);
		this.dishSearchViewController = new DishSearchViewController(this.dishSearchView, this.model, this);
		this.dishDetailView = new DishDetailView(document.querySelector("#dishDetailView"), this.model);
		this.dishDetailViewController = new DishDetailViewController(this.dishDetailView, this.model, this);
		this.dinnerOverView = new DinnerOverView(document.querySelector("#dinnerOverView"), this.model);
		this.dinnerOverViewController = new DinnerOverViewController(this.dinnerOverView, this.model, this);
		this.dinnerPrintView = new DinnerPrintView(document.querySelector("#dinnerPrintView"), this.model);
		this.renderFrontPage()
	}
	
	renderFrontPage() {
		this.hideAll()
		$("#frontPageView").removeAttr('hidden');
	}
	
	renderDishSearch() {
		this.hideAll()
		$("#sideBarView").removeAttr('hidden');
		$("#dishSearchView").removeAttr('hidden');
	}
	
	renderDishDetail() {
		this.hideAll()
		$("#sideBarView").removeAttr('hidden');
		$("#dishDetailView").removeAttr('hidden');
	}
	
	renderDinnerView() {
		this.hideAll()
		$("#topBarView").removeAttr('hidden');
		$("#dinnerOverView").removeAttr('hidden');
	}
	
	renderDinnerPrint() {
		this.hideAll()
		$("#topBarView").removeAttr('hidden');
		$("#dinnerPrintView").removeAttr('hidden');
	}
	
	hideAll() {
		$("#sideBarView").attr('hidden', true);
		$("#frontPageView").attr('hidden', true);
		$("#topBarView").attr('hidden', true);
		$("#dishSearchView").attr('hidden', true);
		$("#dishDetailView").attr('hidden', true);
		$("#dinnerPrintView").attr('hidden', true);
		$("#dinnerOverView").attr('hidden', true);
	}
	
}
 
