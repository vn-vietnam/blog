const blogConfig: any = {
    // author name
    author: "Kien Nguyen",

    // Logo
    logo: {
    
        image: "/logo-blog.png", //  the file path of the logo in the public directory
        text: "NTKBlog", // null || text
        isHomeLink: true, // true | false
    },

    // website title
    title: "NTKBlog",

    // website description
    description: "Kien Nguyen Blog",

    // light | dark
    theme: "light",

    // your blog repo || your github repo || null
    githubRepo: "https://github.com/vn-vietnam",

    // routes
    routes: [
        {
            name: 'blog',
            value: '/blog'
        },
        {
            name: 'tags',
            value: '/tags'
        },
        {
            name: 'projects',
            value: '/project'
        },
    ],

    // socials links
    socials: {
        email: "kient2005@gmail.com",
        github: "https://github.com/vn-vietnam",
        twitter: "https://twitter.com",
        linkedin: "https://www.linkedin.com/in/ntk2001/",
        facebook: "",
        instagram: "",
        youtube: "",
    },

    // home page config
    home: {
        title: "home.title",
        description: "home.description",
    },

    // blog page config
    blog: {
        title: 'blog.title',
        description: 'blog.description',
        pinnedSort: "desc", // "asc" | "desc"
    },

    // tags page config
    tags: {
        title: 'tags.title',
        description: 'tags.description',
    },

    // project page config
    project: {
        title: "project.title",
        description: "project.description",
        projects: [
            {
                name: "list.1.name",
                description: "list.1.description",
                href: "http://porfolio-beta-lake.vercel.app",
                github: "http://github.com/vn-vietnam/portfolio",
                status: "list.1.status",
            },
            {
                name: "list.2.name",
                description: "list.2.description",
                status: "list.2.status",
                href: "http://blog-puce-one-75.vercel.app",
                github: "http://github.com/vn-vietnam/blog",
            },
            {
                name: "list.3.name",
                description: "list.3.description",
                status: "list.3.status",
                href: "/",
                github: "http://github.com/vn-vietnam/saas-exam",
            }
        ],
    },

    // Footer
    footer: {
        isShow: true,
        isShowPoweredBy: true,
    },
}

// Plugins Config
// Why define the following as plugins? Because these are some dispensable functions that can be added or removed at will.
const pluginConfig = {
    // Comment
    // comment: {
    //     engine: "giscus", // "" | giscus | utterances

    //     // giscus doc: https://giscus.app
    //     giscus: {
    //         repo: "vn-vietnam/next-blog",
    //         repoId: "R_kgDOKTZ_kQ",
    //         category: "Announcements",
    //         categoryId: "DIC_kwDOKTZ_kc4CfMXK",
    //         mapping: "pathname",
    //         reactionsEnabled: "1",
    //         emitMetadata: "0",
    //         inputPosition: "top",
    //         theme: "light",
    //         lang: "en",
    //         loading: "lazy",
    //     },

    //     // utterances doc: https://utteranc.es
    //     utterances: {
    //         src: "https://utteranc.es/client.js",
    //         repo: "na-vietnam/next-blog",
    //         "issue-term": "pathname",
    //         theme: "github-light",
    //         crossorigin: "anonymous",
    //         label: "",
    //         async: true
    //     }
    // },

    // Pagination
    pagination: {
        engine: "default", // "" | default:pagination button | loadMore:loading more button
        pageSize: 5,
    },

    // Search
    search: {
        engine: "cmdk", //  "" | "cmdk"
    },

    //   Analytics
    analytics: {
        engine: "vercel", // "" | "vercel"
        // vercel doc: https://vercel.com/docs/analytics
    },

    // newsletter
    newsletter: {
        engine: "buttondown", // "" | "buttondown"

        title: "Subscribe to the newsletter", // required
        description: "Stay updated on new releases and features, guides, and case studies.",

        position: {
            footer: true, // in the footer
            blog: true, // on the blog list page
        },

        // buttondown doc: https://buttondown.com
        buttondown: {
            username: "kient2005", //  your buttondown username
        },
    },
}

export {
    blogConfig,
    pluginConfig
}