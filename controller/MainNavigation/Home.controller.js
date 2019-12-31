sap.ui.define([
    'UI5FioriForTools/controller/MainNavigation/BaseController',
    "sap/ui/core/routing/History"
], function (BaseController) {
    "use strict";

    var Controller = BaseController.extend("UI5FioriForTools.controller.MainNavigation.Home",{
        onInit: function(){
			var oRouter = this.getRouter();

			oRouter.getRoute("home").attachMatched(this._onRouteMatched, this);
            //Creating and starting MockServer
            jQuery.sap.require("sap.ui.app.MockServer");

            sap.ui.app.MockServer.config({
                autoRespond: true,
                autoRespondAfter: 0
            });

            // create mockserver
            var oMockServer = new sap.ui.app.MockServer({
                rootUri: "/"
            });

            // start and return
            oMockServer.simulate("localService/metadata.xml", "localService/mockdata");
            oMockServer.start();

            var sURL = "/";
            var amodel = new sap.ui.model.odata.ODataModel(sURL, true);
            var oModel = new sap.ui.model.json.JSONModel();
            var tModel = new sap.ui.model.json.JSONModel();
            amodel.read("/Employees", {
				success: function(oRetrievedResult) {
                    oModel.setData(oRetrievedResult.results.slice(0,3));
                    tModel.setData(oRetrievedResult.results);
				},
                error: function(oError) { /* do something */ }
              });      
              this.getView().setModel(oModel);
              this.getView().setModel(tModel, "totalData");
        },
        onPress: function (oEvent) {
            var oItem, oCtx;
            oItem = oEvent.getSource();
            oCtx = oItem.getBindingContext();
            this.getRouter().navTo("employee", {
                employeeId: oCtx.getProperty("EmployeeID")
            });
        },
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }
    });

    return Controller;
});