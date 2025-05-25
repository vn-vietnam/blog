'use client'

import { ThemeProvider } from 'next-themes'
import { blogConfig } from '@/config/blog.config'
import { useEffect, useState } from 'react'

export default function ProviderTheme({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <>{children}</>
    }

    return (
        <ThemeProvider attribute="class" defaultTheme={blogConfig.theme} enableSystem>
            {children}
        </ThemeProvider>
    )
}