import {useRouter} from "next/router";

export const useRouterPush = (url: string) => {
    const router = useRouter()
    return () => router.push(url)
}