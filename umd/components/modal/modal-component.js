(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "../../platform/key", "../../navigation/nav-params", "../../navigation/view-controller", "../../gestures/gesture-controller", "../../util/module-loader", "rxjs/add/operator/take"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var key_1 = require("../../platform/key");
    var nav_params_1 = require("../../navigation/nav-params");
    var view_controller_1 = require("../../navigation/view-controller");
    var gesture_controller_1 = require("../../gestures/gesture-controller");
    var module_loader_1 = require("../../util/module-loader");
    require("rxjs/add/operator/take");
    /**
     * @hidden
     */
    var ModalCmp = (function () {
        function ModalCmp(_cfr, _renderer, _elementRef, _navParams, _viewCtrl, gestureCtrl, moduleLoader) {
            this._cfr = _cfr;
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            this._navParams = _navParams;
            this._viewCtrl = _viewCtrl;
            this.moduleLoader = moduleLoader;
            var opts = _navParams.get('opts');
            (void 0) /* assert */;
            this._gestureBlocker = gestureCtrl.createBlocker({
                disable: [gesture_controller_1.GESTURE_MENU_SWIPE, gesture_controller_1.GESTURE_GO_BACK_SWIPE]
            });
            this._bdDismiss = opts.enableBackdropDismiss;
            if (opts.cssClass) {
                opts.cssClass.split(' ').forEach(function (cssClass) {
                    // Make sure the class isn't whitespace, otherwise it throws exceptions
                    if (cssClass.trim() !== '')
                        _renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
                });
            }
        }
        ModalCmp.prototype.ionViewPreLoad = function () {
            var component = this._navParams.data.component;
            if (!component) {
                console.warn('modal\'s page was not defined');
                return;
            }
            var cfr = this.moduleLoader.getComponentFactoryResolver(component);
            if (!cfr) {
                cfr = this._cfr;
            }
            var componentFactory = cfr.resolveComponentFactory(component);
            // ******** DOM WRITE ****************
            var componentRef = this._viewport.createComponent(componentFactory, this._viewport.length, this._viewport.parentInjector, []);
            this._setCssClass(componentRef, 'ion-page');
            this._setCssClass(componentRef, 'show-page');
            // Change the viewcontroller's instance to point the user provided page
            // Lifecycle events will be sent to the new instance, instead of the modal's component
            // we need to manually subscribe to them
            this._viewCtrl._setInstance(componentRef.instance);
            this._viewCtrl.willEnter.subscribe(this._viewWillEnter.bind(this));
            this._viewCtrl.didEnter.take(1).subscribe(this._viewDidEnter.bind(this));
            this._viewCtrl.didLeave.subscribe(this._viewDidLeave.bind(this));
            this._enabled = true;
        };
        ModalCmp.prototype._viewWillEnter = function () {
            this._gestureBlocker.block();
        };
        ModalCmp.prototype._viewDidEnter = function () {
            var _this = this;
            setTimeout(function () {
                _this._elementRef.nativeElement.focus();
            }, 10);
        };
        ModalCmp.prototype._viewDidLeave = function () {
            this._gestureBlocker.unblock();
        };
        ModalCmp.prototype._setCssClass = function (componentRef, className) {
            this._renderer.setElementClass(componentRef.location.nativeElement, className, true);
        };
        ModalCmp.prototype._bdClick = function () {
            if (this._enabled && this._bdDismiss) {
                var opts = {
                    minClickBlockDuration: 400
                };
                return this._viewCtrl.dismiss(null, 'backdrop', opts);
            }
        };
        ModalCmp.prototype._keyUp = function (ev) {
            if (this._enabled && this._viewCtrl.isLast() && ev.keyCode === key_1.KEY_ESCAPE) {
                this._bdClick();
            }
        };
        ModalCmp.prototype.ngOnDestroy = function () {
            (void 0) /* assert */;
            this._gestureBlocker.destroy();
        };
        ModalCmp.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-modal',
                        host: {
                            'role': 'dialog',
                            'tabindex': '-1',
                            'aria-dialog': ''
                        },
                        template: '<ion-backdrop (click)="_bdClick()" [class.backdrop-no-tappable]="!_bdDismiss"></ion-backdrop>' +
                            '<div class="modal-wrapper">' +
                            '<div #viewport nav-viewport></div>' +
                            '</div>'
                    },] },
        ];
        /** @nocollapse */
        ModalCmp.ctorParameters = function () { return [
            { type: core_1.ComponentFactoryResolver, },
            { type: core_1.Renderer, },
            { type: core_1.ElementRef, },
            { type: nav_params_1.NavParams, },
            { type: view_controller_1.ViewController, },
            { type: gesture_controller_1.GestureController, },
            { type: module_loader_1.ModuleLoader, },
        ]; };
        ModalCmp.propDecorators = {
            '_viewport': [{ type: core_1.ViewChild, args: ['viewport', { read: core_1.ViewContainerRef },] },],
            '_keyUp': [{ type: core_1.HostListener, args: ['body:keyup', ['$event'],] },],
        };
        return ModalCmp;
    }());
    exports.ModalCmp = ModalCmp;
});
//# sourceMappingURL=modal-component.js.map