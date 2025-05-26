import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import Link from "next/link";
import Time from "@/components/Time";
import { CommandLoading } from "cmdk";
import { usePathname } from "next/navigation";

const Cmdk = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const pathname = usePathname();
	const locale = pathname.split("/")[1] || "en"; 
	useEffect(() => {
		fetch(`/${locale}/api/get_posts?locale=${locale}`)
			.then((res) => res.json())
			.then((data) => {
				setPosts(data.data.slice(0, 10));
				setLoading(false);
			});
	}, [locale]);
	return (
		<CommandDialog open={open} onOpenChange={() => setOpen(!open)}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList className={"space-y-4 max-h-[480px]"}>
				<CommandGroup heading="Blog">
					<div className={"space-y-4"}>
						{posts.map((post: any) => (
							<Link
								href={`/${locale}/blog/${post?.id}`}
								key={post?.id}
								onClick={() => setOpen(false)}
							>
								<CommandItem
									className={"flex flex-col justify-center items-start"}
								>
									<div>
										<Time date={post.date} />
									</div>
									<span className={"text-lg"}>{post.title}</span>
								</CommandItem>
							</Link>
						))}
					</div>
				</CommandGroup>
				
				<CommandEmpty>No results found.</CommandEmpty>
				
				
				{loading &&  (
					<CommandLoading>
						<CommandEmpty>Loading.</CommandEmpty>
					</CommandLoading>
				)}
			</CommandList>
		</CommandDialog>
	);
};

export default Cmdk;
