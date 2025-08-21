// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import partytown from '@astrojs/partytown';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';
import starlightThemeBlack from 'starlight-theme-black';

import sitemap from '@astrojs/sitemap';

import markdoc from '@astrojs/markdoc';

import robotsTxt from 'astro-robots-txt';

import starlight from '@astrojs/starlight';
import starlightFullViewMode from 'starlight-fullview-mode'
import starlightUtils from "@lorenzo_lewis/starlight-utils";

import starlightScrollToTop from 'starlight-scroll-to-top'

// https://astro.build/config
export default defineConfig({
    site: 'https://judaicadhpenn.org',
    vite: {
        plugins: [tailwindcss()]
    },

    integrations: [partytown(), react(), sitemap(), markdoc(), robotsTxt(),
        starlight({

                title: "Judaica Collections at Penn",
                description: 'Judaica Collections and Resources from Penn Libraries',
                tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 6 },
                lastUpdated: true,
                logo: { src: './src/assets/pomegranate.svg' },

                disable404Route: true,



                customCss: [ './src/styles/starlight.css',
                ],
                favicon: './favicon.ico',



                plugins: [
                    starlightFullViewMode({}),
                    starlightUtils({}),
                    starlightScrollToTop(),
                    starlightThemeBlack({
                        navLinks: [ // optional
                            { label: 'Home',
                            link: '/'},
                            { label: 'Collections',
                                link: '/collections'},
                            { label: 'Judaica DH',
                                link: '/judaicadh'},
                            { label: 'About',
                                link: '/about'},
                        ],
                        footerText: //optional
                            'Built & designed by [Judaica DH at Penn](https://www.library.upenn.edu/kislak/judaicadh). The source code for this website is available on [GitHub](https://github.com/judaicadh/judaicapenn).'
                    }),

                ],
                sidebar: [
                    {
                        label: "LibGuides",
                        autogenerate: { directory: "libguides" }, // looks in src/content/docs/guides/**
                    },
                ],
            }

        )],
    adapter: netlify()
});