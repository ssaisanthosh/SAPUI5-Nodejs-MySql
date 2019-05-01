sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageBox'
], function (Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("Node.controller.View1", {
	
		onInit: function () {
			this._loadData();

		},
		onSave: function (oEvent) {
			var data = {};
			var that = this;
			data.todo = this.getView().byId("todo").getValue();
			jQuery.ajax({
				type: "POST",
				url: "/Todo/",
				data: JSON.stringify(data),
				contentType: 'application/json',
				async: false,
				success: function (oData) {
					MessageBox.success(oData);	
					that.getView().byId("todo").setValue("");
					that._loadData();	
				}

			});
		},
		onDelete: function (oEvent) {
			var sPath = oEvent.getParameter("listItem").getBindingContextPath();
			var iLength = sPath.length;
			var iIndex = sPath.slice(iLength - 1);
			var oModel = this.getView().getModel();
			var oData1 = oModel.getData();
			var item = oData1.todo[iIndex];
			jQuery.ajax({
				type: "DELETE",
				url: "/Todo/" + item.id,
				dataType: "json",
				async: false,
				success: function (oData) {
					MessageBox.success(oData);
					var removed = oData1.todo.splice(iIndex, 1);
					oModel.setData(oData1);
				}

			});
		},
		_loadData: function(){
			var that = this;
			jQuery.ajax({
				type: "GET",
				url: "/Todo",
				dataType: "json",
				async: false,
				success: function (oData) {
					var oViewModel = new JSONModel(oData);
					that.getView().setModel(oViewModel);
				}
			});
		}
	});
});