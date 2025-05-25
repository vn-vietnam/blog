'use client';

import {pluginConfig} from "@/config/blog.config";
import {Analytics as VercelAnalytics} from "@vercel/analytics/react"


const Analytics = () => {
    const {engine} = pluginConfig.analytics
    if (!engine) return null

    return (
        <>
            {engine === "vercel" && <VercelAnalytics/>}
        </>
    )
}

export default Analytics