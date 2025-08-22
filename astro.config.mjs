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
                        mergeFilter: { site: 'Exhibits Website' },
                        language: 'en'
                    },
                    {
                        bundlePath: 'https://judaicadhpenn.org/pagefind/',
                        baseUrl: 'https://judaicadhpenn.org',
                        indexWeight: 1.0, // local content weighted highest
                        mergeFilter: { site: 'Judaica Website' },
                        language: 'en',
                    },
                ],
            },

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
                    }),

                ],
                sidebar: [
                    {
                        label: "LibGuides",
                        autogenerate: { directory: "libguides" }, // looks in src/content/docs/guides/**
                    },
                    {
                        label: 'Other Resources',
                        items: [

                            {
                                label: "Penn's Digital Repository",
                                link: "https://colenda.library.upenn.edu/?utf8=%E2%9C%93&search_field=all_fields&q=Judaica",

                            },

                            {
                                label: 'Judaica Web Exhibits',
                                link: 'https://exhibits.judaicadhpenn.org',

                            },
                            {
                                label: "Penn's Finding Aids",
                                link: 'https://findingaids.library.upenn.edu/records?f%5Brepository_ssi%5D%5B%5D=University+of+Pennsylvania%3A+Archives+at+the+Library+of+the+Katz+Center+for+Advanced+Judaic+Studies&search_field=all_fields',

                            },
                        ],
                    },
                ],
            }

        )],
    adapter: netlify()
});