// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import partytown from '@astrojs/partytown';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

import sitemap from '@astrojs/sitemap';

import markdoc from '@astrojs/markdoc';

import robotsTxt from 'astro-robots-txt';

import starlight from '@astrojs/starlight';
import starlightFullViewMode from 'starlight-fullview-mode'
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import starlightDocSearch from '@astrojs/starlight-docsearch';

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
                favicon: '/assets/images/favicon.ico',



                plugins: [
                    starlightFullViewMode({}),
                    starlightUtils({}),
                    starlightDocSearch({
                        appId: '5JABJKRLAV',
                        apiKey: 'b8ddb53a3b807b350826f3ad0d1d67ee',
                        indexName: 'LibGuides',
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