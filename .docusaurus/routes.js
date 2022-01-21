
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docusaurus/__docusaurus/debug',
    component: ComponentCreator('/docusaurus/__docusaurus/debug','cd2'),
    exact: true
  },
  {
    path: '/docusaurus/__docusaurus/debug/config',
    component: ComponentCreator('/docusaurus/__docusaurus/debug/config','136'),
    exact: true
  },
  {
    path: '/docusaurus/__docusaurus/debug/content',
    component: ComponentCreator('/docusaurus/__docusaurus/debug/content','b6c'),
    exact: true
  },
  {
    path: '/docusaurus/__docusaurus/debug/globalData',
    component: ComponentCreator('/docusaurus/__docusaurus/debug/globalData','038'),
    exact: true
  },
  {
    path: '/docusaurus/__docusaurus/debug/metadata',
    component: ComponentCreator('/docusaurus/__docusaurus/debug/metadata','5f4'),
    exact: true
  },
  {
    path: '/docusaurus/__docusaurus/debug/registry',
    component: ComponentCreator('/docusaurus/__docusaurus/debug/registry','ab4'),
    exact: true
  },
  {
    path: '/docusaurus/__docusaurus/debug/routes',
    component: ComponentCreator('/docusaurus/__docusaurus/debug/routes','cf4'),
    exact: true
  },
  {
    path: '/docusaurus/blog',
    component: ComponentCreator('/docusaurus/blog','cd0'),
    exact: true
  },
  {
    path: '/docusaurus/blog/archive',
    component: ComponentCreator('/docusaurus/blog/archive','ae5'),
    exact: true
  },
  {
    path: '/docusaurus/blog/manage',
    component: ComponentCreator('/docusaurus/blog/manage','78a'),
    exact: true
  },
  {
    path: '/docusaurus/blog/setup',
    component: ComponentCreator('/docusaurus/blog/setup','ce6'),
    exact: true
  },
  {
    path: '/docusaurus/blog/tags',
    component: ComponentCreator('/docusaurus/blog/tags','540'),
    exact: true
  },
  {
    path: '/docusaurus/blog/tags/code-sandbox',
    component: ComponentCreator('/docusaurus/blog/tags/code-sandbox','b7b'),
    exact: true
  },
  {
    path: '/docusaurus/blog/tags/docusaurus',
    component: ComponentCreator('/docusaurus/blog/tags/docusaurus','6b0'),
    exact: true
  },
  {
    path: '/docusaurus/blog/tags/git-hub',
    component: ComponentCreator('/docusaurus/blog/tags/git-hub','625'),
    exact: true
  },
  {
    path: '/docusaurus/blog/tags/mac',
    component: ComponentCreator('/docusaurus/blog/tags/mac','7c8'),
    exact: true
  },
  {
    path: '/docusaurus/blog/tags/チュートリアル',
    component: ComponentCreator('/docusaurus/blog/tags/チュートリアル','d1d'),
    exact: true
  },
  {
    path: '/docusaurus/blog/welcome',
    component: ComponentCreator('/docusaurus/blog/welcome','7c6'),
    exact: true
  },
  {
    path: '/docusaurus/markdown-page',
    component: ComponentCreator('/docusaurus/markdown-page','8cd'),
    exact: true
  },
  {
    path: '/docusaurus/docs',
    component: ComponentCreator('/docusaurus/docs','07c'),
    routes: [
      {
        path: '/docusaurus/docs/basics/chapter01',
        component: ComponentCreator('/docusaurus/docs/basics/chapter01','f4a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/basics/chapter02',
        component: ComponentCreator('/docusaurus/docs/basics/chapter02','c62'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/basics/chapter03',
        component: ComponentCreator('/docusaurus/docs/basics/chapter03','283'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/basics/chapter04',
        component: ComponentCreator('/docusaurus/docs/basics/chapter04','38a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/basics/chapter05',
        component: ComponentCreator('/docusaurus/docs/basics/chapter05','8c6'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/basics/chapter06',
        component: ComponentCreator('/docusaurus/docs/basics/chapter06','559'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/basics/chapter07',
        component: ComponentCreator('/docusaurus/docs/basics/chapter07','36c'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/basics/chapter08',
        component: ComponentCreator('/docusaurus/docs/basics/chapter08','1c5'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/intro',
        component: ComponentCreator('/docusaurus/docs/intro','c4d'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/docusaurus/docs/tutorial-basics/congratulations','69b'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/docusaurus/docs/tutorial-basics/create-a-blog-post','941'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/tutorial-basics/create-a-document',
        component: ComponentCreator('/docusaurus/docs/tutorial-basics/create-a-document','688'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/tutorial-basics/create-a-page',
        component: ComponentCreator('/docusaurus/docs/tutorial-basics/create-a-page','856'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/docusaurus/docs/tutorial-basics/deploy-your-site','74f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/tutorial-basics/markdown-features',
        component: ComponentCreator('/docusaurus/docs/tutorial-basics/markdown-features','34a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/docusaurus/docs/tutorial-extras/manage-docs-versions','c1e'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docusaurus/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/docusaurus/docs/tutorial-extras/translate-your-site','dc1'),
        exact: true,
        'sidebar': "tutorialSidebar"
      }
    ]
  },
  {
    path: '/docusaurus/',
    component: ComponentCreator('/docusaurus/','fa7'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
