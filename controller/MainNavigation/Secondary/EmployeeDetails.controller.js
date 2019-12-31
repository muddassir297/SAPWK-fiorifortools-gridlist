sap.ui.define([
    'UI5FioriForTools/controller/MainNavigation/BaseController',
    "sap/ui/core/routing/History"
], function (BaseController, History) {
    "use strict";

    var Controller = BaseController.extend("UI5FioriForTools.controller.MainNavigation.Secondary.EmployeeDetails",{
        onInit: function(){
			var oRouter = this.getRouter();

			oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);
            
            //Model Setting
            var sURL = "/";
            var amodel = new sap.ui.model.odata.ODataModel(sURL, true);
            this.getView().setModel(amodel);
      }
    });

    return Controller;
});