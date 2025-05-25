import {pluginConfig} from "@/config/blog.config";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import React, { Suspense } from "react";

const PaginationInner = ({allCount, generateHref}: {allCount: number, generateHref: (page: number) => string}) => {
    const searchParams = useSearchParams()
    const {engine, pageSize} = pluginConfig.pagination
    if (!engine) return null
    const page = Number(searchParams.get('page')) || 1

    return (
        <>
            {engine === "default" &&
                <div className={'w-full flex justify-items-center items-center'}>
                    <div className={'w-full flex justify-start'}>
                        {page > 1 && (
                            <PaginationPrevious href={generateHref(page - 1)}/>
                        )}
                    </div>
                    <div className={'w-full flex justify-center'}>
                        {page} of {Math.ceil(allCount / pageSize)}
                    </div>
                    <div className={'w-full flex justify-end'}>
                        {Math.ceil(allCount / pageSize) > page && (
                            <PaginationNext href={generateHref(page + 1)}/>
                        )}
                    </div>
                </div>
            }
            {engine === "loadMore" &&
                <Link href={generateHref(page + 1)}>
                    <Button variant={"outline"} className={'w-full'}>
                        Load More ···
                    </Button>
                </Link>
            }
        </>
    )
}

const Pagination = (props: {allCount: number, generateHref: (page: number) => string}) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaginationInner {...props} />
        </Suspense>
    );
}

export default Pagination