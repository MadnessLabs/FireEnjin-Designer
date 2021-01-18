import '@stencil/router';
import { Component, Element, State, h, Prop } from "@stencil/core";
import Slideout from "slideout";
import marked from 'marked';

@Component({
  tag: "fireenjin-designer-gallery",
  styleUrl: "gallery.css",
  scoped: true
})
export class Gallery {
  docs: any = [];
  slideout: Slideout;

  @Prop() host: string;
  @Prop() ionicDocsFilePath: string;
  @Prop() heading = "FireEnjin Designer";

  @Element() galleryEl: any;
  
  @State() components: any = [];
  @State() currentDoc: string;
  
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
    for(const component of this.components) {
      if (window.location.pathname.split('/')[2] === component.tag) {
        docsMarkdown = component.readme;
        break;
      }
    }
    this.currentDoc = marked(docsMarkdown);
  }

  async getComponentPresets() {
    let promises = [];
    this.components.map((component, index) => {
    this.components[index].url = `/organism/${component.tag}/:preset?`;
    promises.push(new Promise((resolve, reject) => {
        const componentName = component.tag.replace(component.tag.split('-')[0]+'-', '');
        try {
          const presets = require(`${componentName}/${componentName}.presets`);
          console.log(presets);
          this.components[index].presets = presets.default;
          resolve(presets.default);
        } catch (error) {
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
    require("https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js");
    try {
      const response = await fetch(this.ionicDocsFilePath ? this.ionicDocsFilePath : `${this.host ? this.host : ""}/core.json`);
      this.docs = await response.json();
    } catch (error) {
      console.log("Error getting docs for components.");
    }
    this.components = this.docs && this.docs.components && this.docs.components ? this.docs.components : [];
    this.slideout = new Slideout({
      panel: this.galleryEl.querySelector('#panel'),
      menu: this.galleryEl.querySelector('#menu'),
      padding: 256,
      tolerance: 70
    });
    await this.getComponentPresets();
  }

  render() {
    return [
      <nav id="menu">
        <fireenjin-designer-sidebar components={this.components} />
      </nav>,
      <main id="panel">
        <header>
          <a class="menu-button" onClick={(event) => this.toggleSidebar(event)}>
            &#9776;
          </a>
          {this.heading ? <h2 innerHTML={this.heading} /> : null}
          <a class="docs-button" onClick={(event) => this.viewDocs(event)}>Docs</a>
        </header>
        <div class="docs-panel" innerHTML={this.currentDoc} />
        <stencil-router id="router">
          {this.components.map((component) => 
            <stencil-route url={component.url} component='fireenjin-designer-organism' componentProps={{component}} />
          )}
        </stencil-router>
      </main>
    ];
  }
}
