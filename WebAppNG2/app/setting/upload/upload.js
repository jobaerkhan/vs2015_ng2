"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var FV_1 = require('../../shared/juForm/FV');
var app_service_1 = require('../../shared/app.service');
var UploadComponent = (function () {
    function UploadComponent(service) {
        this.service = service;
        this.list = [];
        this.counter = 0;
    }
    UploadComponent.prototype.ngOnInit = function () {
        this.initGrid();
    };
    UploadComponent.prototype.loadData = function (params) {
        return this.service.getUploadData('scolar');
    };
    UploadComponent.prototype.saveRecords = function () {
        console.log(this.gridOptions.api.grid.getUpdatedRecords());
    };
    UploadComponent.prototype.initGrid = function () {
        var _this = this;
        this.gridOptions = {
            quickSearch: true,
            pagerPos: 'bottom',
            colResize: true,
            rowHeight: 50,
            enableCellEditing: true,
            columnDefs: [
                { headerName: '<a href="javascript:;" (click)="config.addItem()" title="New item"><b class="fa fa-plus-circle"></b> </a>', width: 30, cellRenderer: function (row, index) { return ++index; } },
                { headerName: 'Name', filter: 'set', sort: true, field: 'name' },
                { headerName: 'Education', filter: 'set', sort: true, change: this.changeEducation.bind(this), validators: FV_1.FV.required, field: 'education', type: 'juSelect', width: 160 },
                { headerName: 'Age', filter: 'number', sort: true, field: 'age', type: 'number', width: 100, validators: FV_1.FV.required },
                { headerName: 'Birth Date', field: 'bdate', type: 'datepicker', width: 160, validators: FV_1.FV.required },
                { headerName: 'Address', viewMode: 'select', search: true, field: 'address', type: 'juSelect', width: 170, validators: FV_1.FV.required },
                { headerName: 'Description', field: 'description', type: 'text', validators: [FV_1.FV.required, FV_1.FV.minLength(5)], width: 220 }
            ],
            addItem: function () {
                _this.counter++;
                _this.gridOptions.api.grid.addItem({ name: 'Abdulla' + _this.counter });
            }
        };
    };
    UploadComponent.prototype.gridLoad = function (grid) {
        grid.setDropdownData('education', this.service.getEducations2());
    };
    UploadComponent.prototype.changeEducation = function (obj) {
        var data = [{ name: 'Tangail', value: 'Tangail' }, { name: 'Dhaka', value: 'Dhaka' }];
        this.gridOptions.api.grid.setJuSelectData('address', data, obj.index);
    };
    UploadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            template: "\n            <div \n                  class=\"juGrid\" \n                  title=\"Grid Cell Editable Example\"                  \n                  (onLoad)=\"gridLoad($event)\" \n                  [data]=\"list\" \n                  [options]=\"gridOptions\">\n\n             </div>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveRecords()\">Save Records</button>\n            "
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], UploadComponent);
    return UploadComponent;
}());
exports.UploadComponent = UploadComponent;
//# sourceMappingURL=upload.js.map