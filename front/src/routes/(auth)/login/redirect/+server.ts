import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ locals, url, cookies }) => {
    const redirectUrl = "http://localhost:5173/login/redirect";
    const params = new URLSearchParams(url.search);
    const provider = JSON.parse(cookies.get('state') || '{}');

    // compare the redirect's state param and the stored provider's one
    if (provider.state !== params.get("state")) {
        throw redirect(303, '/login');
    }
    // authenticate
    try {
        await locals.pb.collection('users').authWithOAuth2(
            provider.name,
            params.get("code") || "",
            provider.codeVerifier,
            redirectUrl
        )
        return new Response('Redirect', {status: 303, headers: { Location: '/' }});
    } catch (err) {
        console.log("err ", err)
        throw redirect(303, '/login');
    }
  }) satisfies RequestHandler;