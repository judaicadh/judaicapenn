// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import partytown from '@astrojs/partytown';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import embeds from 'astro-embed/integration';

import netlify from '@astrojs/netlify';

import sitemap from '@astrojs/sitemap';

import markdoc from '@astrojs/markdoc';

import robotsTxt from 'astro-robots-txt';

import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black';
import starlightCoolerCredit from 'starlight-cooler-credit'

import starlightUtils from "@lorenzo_lewis/starlight-utils";

import starlightScrollToTop from 'starlight-scroll-to-top'

// https://astro.build/config
export default defineConfig({
    site: 'https://judaicadhpenn.org',
    vite: {
        plugins: [tailwindcss()]
    },

    integrations: [partytown(),  react(), sitemap(), markdoc(), robotsTxt(), starlight({

            title: "LibGuides for Jewish Studies",
            description: 'Jewish Studies-related LibGuides from Penn Libraries',
            tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 6 },
            lastUpdated: true,
            logo: { src: './src/assets/pomegranate.svg' },




            components: {
                TableOfContents: './src/components/tableofcontents.astro',
            },
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
                starlightCoolerCredit({
                    showImage: false,
                    credit: {
                        title: {
                            en: "Built by Judaica DH at Penn",

                        },

                        href: "https://www.library.upenn.edu/kislak/judaicadh",
                        description: {
                            en: "Click here to learn more",
                        },
                    },

                }),
/*
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
*/



                starlightScrollToTop(),

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
                            attrs:  { target: '_blank' },

                            },

                        {
                            label: 'Judaica Web Exhibits',
                            link: 'https://exhibits.judaicadhpenn.org',
                            attrs: { target: '_blank' },
                        },
                        {
                            label: "Penn's Finding Aids",
                            link: 'https://findingaids.library.upenn.edu/records?f%5Brepository_ssi%5D%5B%5D=University+of+Pennsylvania%3A+Archives+at+the+Library+of+the+Katz+Center+for+Advanced+Judaic+Studies&search_field=all_fields',
                            attrs: { target: '_blank' },
                        },
                    ],
                },
            ],
        }

    ), embeds(), mdx() ],
    adapter: netlify()
});