import {BaseFilter} from './juGrid';
import {Observable, Subscription} from 'rxjs/Rx';
export class NumberFilter implements BaseFilter {
    private _isActive: boolean = false;
    private _gui: HTMLElement;
    private _isApply: boolean = false;
    
    searchCategory: string = '=';
    searchText: string = '';
    init(params: any) {
        this.setupGui(params);
    }
    getGui(): HTMLElement {
        return this._gui;
    }
    isFilterActive(): boolean {
        return this._isActive;
    }
    doesFilterPass(params: any): boolean {
        let passed = true, colValue = +params.valueGetter(params);
        if (this.searchText) {
            switch (this.searchCategory) {
                case '=':
                    passed = colValue == +this.searchText;
                    break;
                case '!=':
                    passed = colValue != +this.searchText;
                    break;
                case '<':
                    passed = colValue < +this.searchText;
                    break;
                case '<=':
                    passed = colValue <= +this.searchText;
                    break;
                case '>':
                    passed = colValue > +this.searchText;
                    break;
                case '>=':
                    passed = colValue >= +this.searchText;
                    break;
                default:
                    break;
            }
        }
        return passed;
    }
    destroy() {
        this.subsList.forEach(_ => {           
              _.unsubscribe();
              _.remove(_);
           
        });
    }
    //internal
    private subsList: Subscription[] = [];
    private setupGui(params) {
        if (params.params && params.params.apply) {
            this._isApply = params.params.apply;
        }
        this._gui = document.createElement('div');
        this._gui.style.minWidth = '200px';
        this._gui.innerHTML = this.getContent();

        this.subsList.push(Observable.fromEvent(this._gui.querySelector('#ddlFilter'), 'change')
            .map((e: any) => e.target.value)
            .subscribe(val => {
                this.searchCategory = val;
                if (!this._isApply && this.searchText) {
                    params.filterChangedCallback();
                }
            }));

        this.subsList.push(Observable.fromEvent(this._gui.querySelector('#txtFilter'), 'keyup')
            .distinctUntilChanged()
            .debounceTime(300)
            .map((e: any) => e.target.value)
            .subscribe(val => {
                this.searchText = val;
                this._isActive = val ? true : false;
                if (!this._isApply) {
                    params.filterChangedCallback();
                }
            }));
        if (this._isApply) {
            this.subsList.push(Observable.fromEvent(this._gui.querySelector('#applyButton'), 'click')
                .subscribe(val => {
                    params.filterChangedCallback();
                }));
        }
    }
    private getContent() {
        let tpl: any[] = [];
        tpl.push('<div style="padding:5px">');
        tpl.push('<div>');
        tpl.push(`<select id="ddlFilter" style="display:inline-block;width:120px">
            <option value="=">Equals</option>
            <option value="!=">Not equals</option>
            <option value="<">Less than</option>
            <option value="<=">Less than or equal</option>
            <option value=">">Greater than</option>
            <option value=">=">Greater than or equal</option>         
       </select>`)
        tpl.push('</div>');
        tpl.push('<div style="padding-top:3px"><input id="txtFilter" placeholder="Filter..." type="number"></div>');
        if (this._isApply) {
            tpl.push('<div style="padding-top:3px;text-align:center;"><input id="applyButton" type="button" value="Apply"></div>');
        }
        tpl.push('</div>');
        return tpl.join('');
    }
}