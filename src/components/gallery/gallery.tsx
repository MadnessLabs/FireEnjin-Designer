import '@stencil/router';
import { Component, Element, State, h, Prop, ComponentInterface } from "@stencil/core";
import marked from 'marked';

@Component({
  tag: "fireenjin-designer-gallery",
  styleUrl: "gallery.css",
  scoped: true
})
export class Gallery implements ComponentInterface {
  docs: any = [];

  @Prop() host: string;
  @Prop() ionicDocsFilePath: string;
  @Prop() heading = "FireEnjin Designer";
  @Prop() useHash = false;

  @Element() galleryEl: any;
  
  @State() components: any = [];
  @State() currentDoc: string;
  
  toggleSidebar(event) {
    if (event) {
      event.preventDefault();
    }
  }

  viewDocs(event) {
    if (event) {
      event.preventDefault();
    }
    let docsMarkdown = '';
    for(const component of this.components) {
      if (window.location.pathname.split('/')[2] === component.tag) {
        docsMarkdown = component.readme;
        break;
      }
    }
    this.currentDoc = marked(docsMarkdown);
  }

  async getComponentPresets() {
    for (const [index, component] of this.components.entries()) {
      this.components[index].url = `${this.host ? this.host : ""}/organism/${component.tag}/:preset?`;
      const componentName = component.tag.replace(component.tag.split('-')[0]+'-', '');
      this.components[index].presets = (window as any).presets && (window as any)?.presets[`${componentName}.presets`]
        ? (window as any).presets[`${componentName}.presets`] : {};
    }

    this.components = [...this.components];
  }

  async componentDidLoad() {
    try {
      const response = await fetch(this.ionicDocsFilePath ? this.ionicDocsFilePath : `${this.host ? this.host : ""}/core.json`);
      this.docs = await response.json();
    } catch (error) {
      console.log("Error getting docs for components.");
    }
    this.components = this.docs && this.docs.components && this.docs.components ? this.docs.components : [];
    await this.getComponentPresets();
  }

  render() {
    return [
      <nav id="menu">
        <fireenjin-designer-sidebar useHash={this.useHash} host={this.host} components={this.components} />
      </nav>,
      <main id="panel">
        <header>
          <a class="menu-button" onClick={(event) => this.toggleSidebar(event)}>
            &#9776;
          </a>
          {this.heading ? <h2 innerHTML={this.heading} /> : null}
          <a class="docs-button" onClick={(event) => this.viewDocs(event)}>Docs</a>
        </header>
        <div id="page-wrapper">
          <div class="docs-panel" innerHTML={this.currentDoc} />
          <stencil-router id="router" historyType={this.useHash ? "hash" : "browser" } >
            {this.components.map((component) => 
              <stencil-route url={component.url} component='fireenjin-designer-organism' componentProps={{component, useHash: this.useHash, host: this.host}} />
            )}
          </stencil-router>
        </div>
        
      </main>
    ];
  }
}
