sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";
	return {

		onInit: function () {
			// create
			jQuery.sap.require("sap.ui.app.MockServer");

			sap.ui.app.MockServer.config({
				autoRespond: true,
				autoRespondAfter: 0
			});

			var oMockServer = new MockServer({
				rootUri: "/"
			});
			var oUriParameters = jQuery.sap.getUriParameters();
			// configure

			// simulate
			oMockServer.simulate("localService/metadata.xml", "localService/mockdata");
			// start
			oMockServer.start();
		}
	};
});
