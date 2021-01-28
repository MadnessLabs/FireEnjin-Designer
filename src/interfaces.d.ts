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
  innerHTML?: (component: any, props: any) => string;
  beforeHTML?: (component: any, props: any) => string;
  afterHTML?: (component: any, props: any) => string;
  hooks?: {
    onSetPreset: (data?: { organismEl?: HTMLFireenjinDesignerOrganismElement; props?: any; preset?: OrganismPreset; presetName?: string; component?: OrganismComponent }) => void;
    onUpdateProp?: (data?: { organismEl?: HTMLFireenjinDesignerOrganismElement; props?: any; preset?: OrganismPreset; propName?: string; component?: OrganismComponent }) => void;
  };
}
