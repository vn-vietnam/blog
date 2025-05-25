const blogConfig: any = {
    // author name
    author: "Kien Nguyen",

    // Logo
    logo: {
    
        image: "/logo.png", //  the file path of the logo in the public directory
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
            name: 'Blog',
            value: '/blog'
        },
        {
            name: 'Tags',
            value: '/tags'
        },
        {
            name: 'Projects',
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
        title: "Welcome to Kien Nguyen Blog",
        description: "Using Next.js 15, Tailwind CSS, and TypeScript to build a blog",
    },

    // blog page config
    blog: {
        title: 'My Blogs',
        description: 'Blog Chanel',
        pinnedSort: "desc", // "asc" | "desc"
    },

    // tags page config
    tags: {
        title: 'Tags',
        description: 'All of my tags',
    },

    // project page config
    project: {
        title: "Projects",
        description: "What I've done will be updated here",

        // status color and text
        getStatus: (status: string) => {

            // dev: Under development or planning.
            // active: Currently focused on this project.
            // filed: Not upgrading will only fix bugs.
            // offline: Going offline soon.
            // none: Keep running.
            if (!status) return {}

            switch (status) {
                case "active":
                    return {
                        variant: "default",
                        text: "ACTIVE",
                    }
                case "dev":
                    return {
                        variant: "secondary",
                        text: "DEV",
                    }
                case "filed":
                    return {
                        variant: "outline",
                        text: "FILED",
                    }
                case "offline":
                    return {
                        variant: "destructive",
                        text: "OFFLINE",
                    }
            }
        },

        projects: [
            {
                name: "Project 1",
                description: "Project 1 Description",
                href: "",
                github: "",
                status: "active",
            },
            {
                name: "Project 2",
                description: "Project 2 Description",
                status: "dev",
            },
            {
                name: "Project 3",
                description: "Project 3 Description",
                status: "dev",
                href: "",
                github: "",
            },
            {
                name: "Project 4",
                description: "Project 4 Description",
                href: "",
                github: "",
                status: "filed",
            },
            {
                name: "Project 5",
                description: "Project 5 Description",
                href: "",
                github: "",
                status: "offline",
            },
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