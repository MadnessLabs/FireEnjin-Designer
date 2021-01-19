import { Component, Prop, State, h } from '@stencil/core';
import { MatchResults } from '@stencil/router';


@Component({
  tag: 'fireenjin-designer-organism',
  styleUrl: 'organism.css',
  scoped: true
})
export class Organism {

  @Prop({
    mutable: true
  }) component: {
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
  @Prop() match: MatchResults;

  @State() currentProps = {};
  @State() currentPreset: any = {};

  setPreset(presetName: string) {
    if (this.component.presets && this.component.presets[presetName] && this.component.presets[presetName].props) {
      this.currentPreset = this.component.presets[presetName];
      this.currentProps = this.component?.presets && this.component?.presets[presetName]?.props ? {...this.component.presets[presetName].props} : {};
    } else {
      this.currentProps = this.component?.presets['default'] && this.component.presets['default']?.props ? this.component.presets['default'].props : {};
    }
  }

  updateProp(event, name: string) {
    this.currentProps[name] = event.target.value;
    this.currentProps = {...this.currentProps};
  }
  
  componentWillLoad() {
    if (this.match && this.match.params && this.match.params.preset) {
      this.setPreset(this.match.params.preset);
    }
  }

  render() {
    const Component = this.component?.tag;
    return (
      <div class="organism-wrapper">
        <div class="organism-canvas">
          {this.component ? <Component {...this.currentProps} /> : null}
        </div>
        <div class="organism-sidebar">
          {this.component.props.map(prop => 
            <label>
              {prop.name} - {prop.docs}
              <input name={prop.name} onInput={event => this.updateProp(event, prop.name)} value={this.currentProps && this.currentProps[prop.name] ? this.currentProps[prop.name] : null} />
            </label>
          )}
          <label>
            Inner HTML
            <input name="innerHTML" onInput={event => this.updateProp(event, "innerHTML")} value={this.currentProps && this.currentProps['innerHTML'] ? this.currentProps['innerHTML'] : null} />
          </label>
        </div>
      </div>
    );
  }
}