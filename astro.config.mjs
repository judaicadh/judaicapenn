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
                favicon: './assets/images/favicon.ico',

                pagefind: {
                    ranking: {
                        pageLength: 0.7,
                        termFrequency: 1.0,
                        termSaturation: 0.9,
                        termSimilarity: 1.0,
                    },
                    mergeIndex: [

                        {
                            bundlePath: 'https://exhibits.judaicadhpenn.org/pagefind/',
                            baseUrl: 'https://exhibits.judaicadhpenn.org',
                            indexWeight: 0.8,
                            mergeFilter: { site: 'Exhibits' },
                            language: 'en'
                        },

                        {
                            bundlePath: 'https://judaicadhpenn.org/pagefind/',
                            baseUrl: 'https://judaicadhpenn.org',
                            indexWeight: 0.8, // slightly lower weight if you want local content to rank first
                            mergeFilter: { site: 'LibGuides' },
                            language: 'en',
                        },


                    ],
                },

                plugins: [
                    starlightFullViewMode({}),
                    starlightUtils({}),
                    starlightDocSearch({
                        appId: 'YOUR_APP_ID',
                        apiKey: 'YOUR_SEARCH_API_KEY',
                        indexName: 'YOUR_INDEX_NAME',
                    }),
                ],
                sidebar: [
                    {
                        label: "LibGuides",
                        autogenerate: { directory: "guides" }, // looks in src/content/docs/guides/**
                    },
                ],
            }

        )],
    adapter: netlify()
});