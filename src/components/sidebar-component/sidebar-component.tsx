import { Component, Event, EventEmitter, Prop, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'fireenjin-designer-sidebar-component',
  styleUrl: 'sidebar-component.css',
  shadow: true
})
export class SidebarComponent implements ComponentInterface {
  @Event() enjinSetPreset: EventEmitter<any>;

  @Prop() useHash? = false;
  @Prop() host?: string;
  @Prop() component: {
    docs: string;
    docsTags: any[];
    encapsulation: string;
    events: any[];
    methods: any[];
    presets: any;
    props: {
      attr: string;
      default: any;
      docs: string;
      docsTags: any[];
      mutable: boolean;
      name: string;
      optional: boolean;
      reflectToAttr: boolean;
      required: boolean;
      type: string;
    }[];
    readme: string;
    slots: any[];
    styles: any[];
    tag: string;
    usage: any;
  };

  render() {
    return this.component ? (
      <div>
        <a href={`${this.host ? this.host : ""}${this.useHash ? "#" : ""}/organism/${this.component.tag}`}>
          {this.component.tag}
        </a>
        <div class="component-presets">
          {this.component.presets && Object.keys(this.component.presets).map((presetName) =>
            <a href={`${this.host ? this.host : ""}${this.useHash ? "#" : ""}/organism/${this.component.tag}/${presetName}`}>
              {this.component.presets[presetName].name ? this.component.presets[presetName].name : presetName}
            </a>
          )}
        </div>
      </div>
      
    ) : null;
  }
}