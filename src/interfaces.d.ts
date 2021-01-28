export interface OrganismComponent {
  docs: string;
  docsTags: any[];
  encapsulation: string;
  events: any[];
  methods: any[];
  presets?: {
    [presetName: string]: OrganismComponent;
  };
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
}

export interface OrganismPreset {
  name?: string;
  description?: string;
  props?: any;
  innerHTML?: (component: OrganismComponent, props: any) => string;
  beforeHTML?: (component: OrganismComponent, props: any) => string;
  afterHTML?: (component: OrganismComponent, props: any) => string;
  hooks?: {
    onComponentDidLoad?: (data?: { organismEl?: any; props?: any; preset?: OrganismPreset; component?: OrganismComponent }) => void;
    onComponentWillLoad?: (data?: { organismEl?: any; props?: any; preset?: OrganismPreset; component?: OrganismComponent }) => void;
    onSetPreset?: (data?: { organismEl?: any; props?: any; preset?: OrganismPreset; presetName?: string; component?: OrganismComponent }) => void;
    onUpdateProp?: (data?: { organismEl?: any; props?: any; preset?: OrganismPreset; propName?: string; component?: OrganismComponent }) => void;
  };
}

export interface OrganismPresets {
    [presetName: string]: OrganismPreset;
}

