var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("gallery/gallery", ["require", "exports", "@stencil/core", "slideout", "marked", "@stencil/router"], function (require, exports, core_1, slideout_1, marked_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Gallery = void 0;
    let Gallery = class Gallery {
        constructor() {
            this.docs = [];
            this.components = [];
        }
        toggleSidebar(event) {
            if (event) {
                event.preventDefault();
            }
            this.slideout.toggle();
        }
        viewDocs(event) {
            if (event) {
                event.preventDefault();
            }
            let docsMarkdown = '';
            for (const component of this.components) {
                if (window.location.pathname.split('/')[2] === component.tag) {
                    docsMarkdown = component.readme;
                    break;
                }
            }
            this.currentDoc = marked_1.default(docsMarkdown);
        }
        async getComponentPresets() {
            let promises = [];
            this.components.map((component, index) => {
                this.components[index].url = `/organism/${component.tag}/:preset?`;
                promises.push(new Promise((resolve, reject) => {
                    const componentName = component.tag.replace(component.tag.split('-')[0] + '-', '');
                    try {
                        const presets = require(`${componentName}/${componentName}.presets`);
                        console.log(presets);
                        this.components[index].presets = presets.default;
                        resolve(presets.default);
                    }
                    catch (error) {
                        console.log(`${component.tag} presets not found!`);
                        reject(`${component.tag} presets not found!`);
                    }
                }));
            });
            const response = await Promise.all(promises);
            this.components = [...this.components];
            return response;
        }
        async componentDidLoad() {
            try {
                const response = await fetch('/core.json');
                this.docs = await response.json();
            }
            catch (error) {
                console.log("Error getting docs for components.");
            }
            this.components = this.docs && this.docs.components && this.docs.components ? this.docs.components : [];
            this.slideout = new slideout_1.default({
                panel: this.galleryEl.querySelector('#panel'),
                menu: this.galleryEl.querySelector('#menu'),
                padding: 256,
                tolerance: 70
            });
            await this.getComponentPresets();
        }
        render() {
            return [
                core_1.h("nav", { id: "menu" },
                    core_1.h("fireenjin-designer-sidebar", { components: this.components })),
                core_1.h("main", { id: "panel" },
                    core_1.h("header", null,
                        core_1.h("a", { class: "menu-button", onClick: (event) => this.toggleSidebar(event) }, "\u2630"),
                        core_1.h("h2", null, "FireEnjin Designer"),
                        core_1.h("a", { class: "docs-button", onClick: (event) => this.viewDocs(event) }, "Docs")),
                    core_1.h("div", { class: "docs-panel", innerHTML: this.currentDoc }),
                    core_1.h("stencil-router", { id: "router" }, this.components.map((component) => core_1.h("stencil-route", { url: component.url, component: 'fireenjin-designer-organism', componentProps: { component } }))))
            ];
        }
    };
    __decorate([
        core_1.Element()
    ], Gallery.prototype, "galleryEl", void 0);
    __decorate([
        core_1.State()
    ], Gallery.prototype, "components", void 0);
    __decorate([
        core_1.State()
    ], Gallery.prototype, "currentDoc", void 0);
    Gallery = __decorate([
        core_1.Component({
            tag: "fireenjin-designer-gallery",
            styleUrl: "gallery.css",
            scoped: true
        })
    ], Gallery);
    exports.Gallery = Gallery;
});
define("organism/organism", ["require", "exports", "@stencil/core"], function (require, exports, core_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Organism = void 0;
    let Organism = class Organism {
        constructor() {
            this.currentProps = {};
            this.currentPreset = {};
        }
        setPreset(presetName) {
            if (this.component.presets && this.component.presets[presetName] && this.component.presets[presetName].props) {
                this.currentPreset = this.component.presets[presetName];
                this.currentProps = Object.assign({}, this.component.presets[presetName].props);
            }
            else {
                this.currentProps = this.component.presets['default'] && this.component.presets['default'].props ? this.component.presets['default'].props : null;
            }
        }
        updateProp(event, name) {
            this.currentProps[name] = event.target.value;
            this.currentProps = Object.assign({}, this.currentProps);
        }
        componentDidLoad() {
            if (this.match && this.match.params && this.match.params.preset) {
                this.setPreset(this.match.params.preset);
            }
        }
        render() {
            return (core_2.h("div", { class: "organism-wrapper" },
                core_2.h("div", null, this.component ? core_2.h(this.component.tag, Object.assign({}, this.currentProps, { innerHTML: this.currentPreset.slot && typeof this.currentPreset.slot === "function" ? this.currentPreset.slot() : null })) : null),
                core_2.h("div", { class: "sidebar" }, this.component.props.map(prop => core_2.h("label", null,
                    prop.name,
                    " - ",
                    prop.docs,
                    core_2.h("input", { name: prop.name, onInput: event => this.updateProp(event, prop.name), value: this.currentProps && this.currentProps[prop.name] ? this.currentProps[prop.name] : null }))))));
        }
    };
    __decorate([
        core_2.Prop({
            mutable: true
        })
    ], Organism.prototype, "component", void 0);
    __decorate([
        core_2.Prop()
    ], Organism.prototype, "match", void 0);
    __decorate([
        core_2.State()
    ], Organism.prototype, "currentProps", void 0);
    __decorate([
        core_2.State()
    ], Organism.prototype, "currentPreset", void 0);
    Organism = __decorate([
        core_2.Component({
            tag: 'fireenjin-designer-organism',
            styleUrl: 'organism.css',
            scoped: true
        })
    ], Organism);
    exports.Organism = Organism;
});
define("sidebar/sidebar", ["require", "exports", "@stencil/core"], function (require, exports, core_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sidebar = void 0;
    let Sidebar = class Sidebar {
        constructor() {
            this.components = [];
        }
        render() {
            return core_3.h("div", null, this.components && this.components.length > 0
                && this.components.map(component => core_3.h("fireenjin-designer-sidebar-component", { component: component })));
        }
    };
    __decorate([
        core_3.Prop()
    ], Sidebar.prototype, "components", void 0);
    Sidebar = __decorate([
        core_3.Component({
            tag: "fireenjin-designer-sidebar",
            styleUrl: "sidebar.css"
        })
    ], Sidebar);
    exports.Sidebar = Sidebar;
});
define("sidebar-component/sidebar-component", ["require", "exports", "@stencil/core"], function (require, exports, core_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SidebarComponent = void 0;
    let SidebarComponent = class SidebarComponent {
        render() {
            return this.component ? (core_4.h("div", null,
                core_4.h("a", { href: `/organism/${this.component.tag}` }, this.component.tag),
                core_4.h("div", { class: "component-presets" }, this.component.presets && Object.keys(this.component.presets).map((presetName) => core_4.h("a", { href: `/organism/${this.component.tag}/${presetName}` }, this.component.presets[presetName].name ? this.component.presets[presetName].name : presetName))))) : null;
        }
    };
    __decorate([
        core_4.Event()
    ], SidebarComponent.prototype, "enjinSetPreset", void 0);
    __decorate([
        core_4.Prop()
    ], SidebarComponent.prototype, "component", void 0);
    SidebarComponent = __decorate([
        core_4.Component({
            tag: 'fireenjin-designer-sidebar-component',
            styleUrl: 'sidebar-component.css',
            shadow: true
        })
    ], SidebarComponent);
    exports.SidebarComponent = SidebarComponent;
});
