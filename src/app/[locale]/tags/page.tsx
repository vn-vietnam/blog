import {getTagsData} from "@/app/[locale]/server-utils";
import {Button} from "@/components/ui/button";
import {blogConfig} from "@/config/blog.config";
import PageContainer from "@/components/page-container";
import Link from "next/link";


type Props = {
    params: Promise<{ slug: string; locale: string }>;
  }
export async function generateMetadata() {
    const {title, tags} = blogConfig
    return {
        title: `${tags?.title} - ${title}`,
        description: `${tags.description} ${Object.keys(getTagsData()).join(", ")}`,
    }
}


const Tags = async ({ params }: Props) => {
    const tags = getTagsData()
    const {  locale } = await params;
    return (
        <PageContainer>
            <div className={'flex'}>
                {Object.keys(tags).map((tag: string) => (
                    <Link href={`/${locale}/blog?tag=${tag}`} key={tag}>
                        <Button className={'text-lg px-4 underline-offset-8'} size={'lg'} variant={'link'} key={tag}>
                            <span className={'font-bold'}>{tag}</span>
                            <span className={'text-gray-500'}>({tags[tag]})</span>
                        </Button>
                    </Link>
                ))}
            </div>
        </PageContainer>
    )
}

export default Tags