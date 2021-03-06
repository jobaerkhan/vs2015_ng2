import {Directive, OnInit, Input, ElementRef, OnDestroy, AfterViewInit} from '@angular/core';
import {Subject, Observable, Subscription} from 'rxjs/Rx';
declare var jQuery: any;
//declare var CKEDITOR:any;

@Directive({
    selector: '[pickers]'
})

export class Datetimepicker implements OnInit, OnDestroy {
    @Input() pickers: any = {};
    @Input('picker-name') pickerName: string = '';
    @Input() model: any = {};
    @Input() property: string;
    @Input() config: any;
    @Input() form: any;
    notifyRowEditor: Subject<any> = new Subject();
    inputSubscription:Subscription;
    private pickerObject: any;
    constructor(private el: ElementRef) { }
    ngOnInit() {
        switch (this.pickerName) {
            case 'datepicker':
                this.pickerObject = jQuery('.input-group-addon',this.el.nativeElement).datepicker(this.pickers);
                  this.inputSubscription=Observable.fromEvent(jQuery('input',this.el.nativeElement), 'keyup')
                            .debounceTime(500)
                            .distinctUntilChanged()
                            .pluck('target', 'value')
                            .subscribe(_ => this.setDate(_));               
                this.pickerObject.on('changeDate', (e) => {
                    if (this.property.indexOf('.') !== -1) {
                        let arr = this.property.split('.'), len = arr.length - 1, obj = this.model;
                        for (var i = 0; i < len; i++) {
                            obj = obj[arr[i]];
                        }
                        obj[arr[i]] = e.format();
                    } else {
                        this.model[this.property] = e.format();
                    }
                    if (this.form) {
                        this.form.componentRef.instance
                            .vlidate_input(e.format(), this.config);
                    }
                    if(this.config.change){
                        this.config.change(this.model);
                    }
                    this.notifyRowEditor.next(e.format());
                });
                this.setDate(this.model[this.property]);
                break;
            case 'timepicker':
                jQuery(this.el.nativeElement).timepicker(this.pickers);
                break;
            case 'colorpicker':
                jQuery(this.el.nativeElement).colorpicker(this.pickers);
                break;
        }
        this.config.api = this;
    }
    setDate(date: any) {    
        this.pickerObject.datepicker('update', date);
        this.notifyRowEditor.next(date);
    }
    ngOnDestroy() {
        if (this.pickerName === 'datepicker') {
            this.pickerObject.datepicker('destroy');
        }        
        this.inputSubscription.unsubscribe();
       
    }
}

