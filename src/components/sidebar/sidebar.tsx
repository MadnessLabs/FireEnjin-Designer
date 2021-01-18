import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "fireenjin-designer-sidebar",
  styleUrl: "sidebar.css"
})
export class Sidebar {
  
  @Prop() components: any = [];
  @Prop() host?: string;

  render() {
    return <div>
      {this.components && this.components.length > 0
      && this.components.map(component => <fireenjin-designer-sidebar-component host={this.host} component={component} />)
     }
    </div>;
  }
}
