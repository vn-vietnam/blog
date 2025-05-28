'use client';

import Link from "next/link";
import {CardDescription, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Github} from "lucide-react";
import {blogConfig} from "@/config/blog.config";
import { useTranslations } from "next-intl";


const ProjectContent = () => {
    const {projects} = blogConfig.project
    const t = useTranslations('Projects')
    return (
        <>
            {projects.map((project: any, index: number): any => {
                
                return (
                    <div className={'not-prose'} key={index}>
                        <div className={'flex items-center mb-2'}>
                            
                            {project.href ?
                                <Link href={project.href} className={'underline underline-offset-4'}>
                                    <CardTitle>
                                        {t(project.name)}
                                    </CardTitle>
                                </Link>
                                :
                                <CardTitle>
                                    {t(project.name)}
                                </CardTitle>
                            }
                            {project.status && <Badge className={'ml-4'} >
                                {t(project.status)}
                            </Badge>}
                            {project.github && <Button className={'ml-2'} size={'icon'}>
                              <Link href={project.github}>
                                <Github size={20}/>
                              </Link>
                            </Button>}
                        </div>
                        <CardDescription className={'text-base'}>
                            {t(project.description)}
                        </CardDescription>
                    </div>
                )
            })}
        </>
    );
}


export default ProjectContent