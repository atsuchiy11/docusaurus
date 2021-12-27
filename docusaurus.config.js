// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'I ❤️ JavaScript',
  tagline: `Let's enjoy programming!`,
  url: 'https://prime-x-co-ltd.github.io',
  baseUrl: '/jamstack-js-tutorial/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'prime-x-co-ltd', // Usually your GitHub org/user name.
  projectName: 'jamstack-js-tutorial', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
          editUrl: "https://github.com/prime-x-co-ltd/jamstack-js-tutorial/tree/main"

        },
        blog: {
          blogSidebarTitle: "最近の投稿",
          blogSidebarCount: "ALL",
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'I ❤️ JavaScript',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/prime-x-co-ltd/jamstack-js-tutorial',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/docs/intro',
              },
              {
                label: 'Markdown',
                href: 'https://www.markdown.jp/what-is-markdown/',
              },              
            ],
          },
          {
            title: 'Playground',
            items: [
              {
                label: 'CodeSandbox',
                href: 'https://codesandbox.io/',
              },
              {
                label: 'TS Playground',
                href: 'https://www.typescriptlang.org/play',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/prime-x-co-ltd/jamstack-js-tutorial',
              },
              {
                label: 'Blog',
                to: '/blog',
              },              
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PRIME X Co., Ltd. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
