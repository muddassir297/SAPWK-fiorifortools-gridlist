sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function (Controller) {
    "use strict";
	var resultData = [],
	employeeProfileData= [];
    var Controller = Controller.extend("UI5FioriForTools.controller.MainNavigation.Example2",{
		
        onInit: function(){
			
			  // Setting model  
			  var sURL = "/";
			  var amodel = new sap.ui.model.odata.ODataModel(sURL, true);
			  var oModel = new sap.ui.model.json.JSONModel();

			  amodel.read("/Employees", {
				success: function(oRetrievedResult) {
					
					// Change the json structure to --> { Country: d.Country, gridList: [{ FirstName: d.FirstName, LastName:d.LastName }] }
					employeeProfileData = oRetrievedResult.results.reduce((acc, d) => {
						const gridData = acc.find(a => a.Country === d.Country);
						const gridList = { FirstName: d.FirstName, LastName:d.LastName, EmployeeID: d.EmployeeID, HomePhone:d.HomePhone, ImageURI:d.ImageURI }; // the element in data property
						if (!gridData) {
							//acc.push(...gridList);
							acc.push({Country:d.Country, gridList: [gridList]}) // not found, so need to add data property
						}
						else {
							//acc.push({ Country: d.Country, gridList: [{ FirstName: d.FirstName, LastName:d.LastName }] });
							gridData.gridList.push(gridList) // if found, that means data property exists, so just push new element to found.data.
						}
						return acc;
					}, []);
					
					oModel.setData(employeeProfileData);
            		
				},
                error: function(oError) { /* do something */ }
              });
              this.getView().setModel(oModel);
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