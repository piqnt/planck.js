import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <a href="/planck.js"><strong>Planck.js</strong></a>,
  logoLink: false,
  docsRepositoryBase: 'https://github.com/piqnt/planck.js',
  sidebar: {
    autoCollapse: true,
    defaultMenuCollapseLevel: 1,
  },
  footer: {
    component: null,
  },
  feedback: {
    content: null,
  },
  editLink: {
    component: null,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Planck.js'
    }
  }
}

export default config
