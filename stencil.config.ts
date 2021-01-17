import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'fireenjin-designer',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null,
    },
    {
      type: 'docs-readme'
    },
    {
      type: "docs-json",
      file: "www/core.json"
    }
  ],
  preamble: '(C) Madness Labs https://MadnessLabs.net - MIT License',
};
