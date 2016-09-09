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
var shared_module_1 = require('../shared/shared.module');
var grid_1 = require('./grid/grid');
var upload_1 = require('./upload/upload');
var ClaimImport_component_1 = require('./ClaimImport/ClaimImport.component');
var setting_routes_1 = require('./setting.routes');
var SettingModule = (function () {
    function SettingModule() {
    }
    SettingModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, setting_routes_1.routing],
            declarations: [grid_1.gridExample, upload_1.UploadComponent, ClaimImport_component_1.ClaimImport],
            exports: []
        }), 
        __metadata('design:paramtypes', [])
    ], SettingModule);
    return SettingModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingModule;
//# sourceMappingURL=setting.module.js.map