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
var MessageDialog = (function () {
    function MessageDialog() {
        this.onLoad = new core_1.EventEmitter();
    }
    MessageDialog.prototype.ngOnInit = function () { this.constructForm(); };
    MessageDialog.prototype.ngOnChanges = function (changes) {
    };
    MessageDialog.prototype.constructForm = function () {
        this.formOptions = {
            title: 'Health Care Regulatory System', viewMode: 'popup', message: '',
            inputs: [
                { type: 'html', content: '<div [innerHTML]="config.message"></div>' }
            ],
            buttons: {
                'Ok': { type: 'close', cssClass: 'btn btn-primary' }
            }
        };
    };
    MessageDialog.prototype.fromLoad = function (form) {
        this.form = form;
        this.onLoad.emit(this);
    };
    MessageDialog.prototype.showDialog = function (title, message) {
        if (title)
            this.formOptions['title'] = title;
        this.formOptions['message'] = message;
        this.form.showModal();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MessageDialog.prototype, "onLoad", void 0);
    MessageDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'message, [message], .message',
            template: '<div juForm (onLoad)="fromLoad($event)" [options]="formOptions"></div>'
        }), 
        __metadata('design:paramtypes', [])
    ], MessageDialog);
    return MessageDialog;
}());
exports.MessageDialog = MessageDialog;
//# sourceMappingURL=message.dialog.js.map