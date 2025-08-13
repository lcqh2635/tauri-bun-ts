// .vitepress/config/zh.ts
import { defineConfig } from 'vitepress'
import pkg from '../../../package.json'

export const enUS = defineConfig({
    lang: 'en-US',
    description: '文档描述',
    themeConfig: {
        // 配置首页头部导航菜单，参考 https://vitepress.dev/zh/reference/default-theme-nav
        nav: [
            {text: 'Guide', link: '/en/guide/what-is-vitepress', activeMatch: '/en/guide/'},
            {text: 'Reference', link: '/en/reference/site-config', activeMatch: '/en/reference/'},
            {text: 'Frontend', link: '/frontend/'},
            {
                text: 'Backend',
                items: [
                    {text: 'Spring', link: '/spring/'},
                    {text: 'SpringMVC', link: '/springmvc/'},
                    {text: 'SpringBoot', link: '/springboot/'}
                ]
            },
            {
                text: 'Database',
                items: [
                    {
                        text: 'MySQL',
                        items: [
                            {text: 'Markdown Examples', link: '/markdown-examples'},
                            {text: 'Runtime API Examples', link: '/api-examples'}
                        ]
                    },
                    {
                        text: 'PostgreSQL',
                        items: [
                            {text: 'Markdown Examples', link: '/markdown-examples'},
                            {text: 'Runtime API Examples', link: '/api-examples'}
                        ]
                    },
                    {
                        text: 'MongoDB',
                        items: [
                            {text: 'Markdown Examples', link: '/markdown-examples'},
                            {text: 'Runtime API Examples', link: '/api-examples'}
                        ]
                    },
                    {
                        text: 'Redis',
                        items: [
                            {text: 'Markdown Examples', link: '/markdown-examples'},
                            {text: 'Runtime API Examples', link: '/api-examples'}
                        ]
                    }
                ]
            },
            {
                text: `v${pkg.version}`,
                items: [
                    {
                        text: 'Changelog',
                        link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md',
                    },
                ],
            }
        ],

        // 配置侧边栏，参考 https://vitepress.dev/zh/reference/default-theme-sidebar
        // 不是所有页面都需要侧边栏，以下指定页面会出现侧边栏，其他页面则没有
        sidebar: {
            // 当用户位于 `guide` 目录时，会显示此侧边栏
            '/en/guide/': [
                {
                    text: 'Introduction',
                    collapsed: false,
                    items: [
                        {text: 'What is VitePress？', link: '/en/guide/what-is-vitepress'},
                        {text: 'Getting Started', link: '/en/guide/getting-started'},
                        {text: 'Routing', link: '/en/guide/routing'}
                    ]
                },
                {
                    text: 'Writing',
                    collapsed: false,
                    items: [
                        {text: 'What is VitePress？', link: '/en/guide/'},
                        {text: 'Getting Started', link: '/en/guide/page-one'},
                        {text: 'Routing', link: '/en/guide/page-two'}
                    ]
                },
                {
                    text: 'Customization',
                    collapsed: false,
                    items: [
                        {text: 'What is VitePress？', link: '/en/guide/'},
                        {text: 'Getting Started', link: '/en/guide/page-one'},
                        {text: 'Routing', link: '/en/guide/page-two'}
                    ]
                },
            ],

            // 当用户位于 `reference` 目录时，会显示此侧边栏
            '/en/reference/': [
                {text: 'Site Config',  link: '/en/reference/site-config'},
                {text: 'Frontmatter Config',  link: '/en/reference/frontmatter-config'},
                {text: 'Runtime API',  link: '/en/reference/runtime-api'},
                {
                    text: 'Reference',
                    collapsed: false,
                    items: [
                        {text: 'Index', link: '/config/'},
                        {text: 'Three', link: '/config/three'},
                        {text: 'Four', link: '/config/four'}
                    ]
                }
            ],

        },

        footer: {
            message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
            copyright: 'Copyright © 2019-present <a href="https://github.com/yyx990803">Evan You</a>'
        },

        outline: {
            label: "On this page"
        },
        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },
        lastUpdated: {
            text: "Last updated"
        },
        docFooter: {
            prev: "Previous page",
            next: "Next page"
        },
    },
})
