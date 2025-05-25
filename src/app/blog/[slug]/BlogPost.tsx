'use client';

import React from 'react';
import { TableProperties } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import Time from '@/components/Time';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Suspense } from 'react';
import SideNav from '@/components/side-nav';
import Toc from '@/components/toc';


interface BlogPostProps {
  post: {
    id: string;
    title: string;
    date: string;
    stats: {
      words: number;
      text: string;
    };
    mdxSource: MDXRemoteSerializeResult;
    toc: {
      items: Array<{
        title: string;
        url: string;
        items?: Array<{
          title: string;
          url: string;
        }>;
      }>;
    };
  };
}


export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div className={"w-full flex justify-center"}>
      <div className={'w-full max-w-screen-lg relative'}>
        {/*mobile*/}
        <div className={'block 2xl:hidden sticky top-20 p-2  backdrop-blur-md z-10 w-full shadow-sm'}>
          <div className={'flex justify-between'}>
            <div className={'space-x-4'}>
              <SideNav/>
            </div>
            <Drawer>
              <DrawerTrigger>
                <Button size={"icon"} variant={"ghost"}>
                  <TableProperties size={20}/>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    Table of contents
                  </DrawerTitle>
                </DrawerHeader>
                <Toc toc={post?.toc}/>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/*pc*/}
        <div className={'px-4 pt-8'}>
          <div className={'sticky top-28 hidden 2xl:block '}>
            <div className={'absolute top-24 -left-16 -translate-x-full flex flex-col space-y-4'}>
              <SideNav/>
            </div>
            <div className={'absolute -right-8 translate-x-full'}>
              <div className={'max-w-52 h-full overflow-hidden'}>
                <div className={'text-base font-bold mb-2'}>
                  Table of contents
                </div>
                <Toc toc={post.toc}/>
              </div>
            </div>
          </div>
          <article>
            <div className={'mb-3 text-base text-zinc-400'}>
              <Time date={post.date}/> · {post.stats.words} words · {post.stats.text}
            </div>
            <Suspense fallback={<>Loading...</>}>
              <MDXRemote {...post.mdxSource} />
            </Suspense>
          </article>
          {/* <Comments/> */}
        </div>
      </div>
    </div>
  );
} 