import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {pluginConfig} from "@/config/blog.config";
import { useTranslations } from "next-intl";

const ButtonDown = () => {
    const {buttondown: {username}} = pluginConfig.newsletter
    const t = useTranslations("Footer");
    return (
        <form
            action={`https://buttondown.email/api/emails/embed-subscribe/${username}`}
            method="post"
            target="popupwindow"
            onSubmit={() => {
                window.open(`https://buttondown.com/${username}`, 'popupwindow')
            }}
        >
            <div className="flex w-full max-w-sm items-center flex-col md:flex-row">
                <Input
                    className={"w-72  mr-0 md:mr-4"}
                    type="email"
                    placeholder={t("subscribe button title")}
                    name="email"
                />
                <Button className={" w-full md:w-fit"} type="submit" value={t("subscribe btn")}>{t("subscribe btn")}</Button>
            </div>
        </form>
    )
}

export default ButtonDown