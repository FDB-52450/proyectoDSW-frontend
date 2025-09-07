import { fetchCurrentUser } from "../services/adminService.ts";

export async function checkAuthLoader({ request }: { request: Request }) {
    const user = await fetchCurrentUser()
    
    if (!user) {
        const redirectTo = new URL(request.url).pathname

        throw new Response("Unauthorized", {
            status: 302,
            headers: {
                Location: `/login?redirectTo=${encodeURIComponent(redirectTo)}`,
            },
        })
    }

    return user
}