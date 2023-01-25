import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle = (async function handle({ event, resolve }) {
    event.locals.pb = new PocketBase("http://127.0.0.1:8090");

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
    } catch (_) {
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
    }

    if (!event.locals.pb.authStore.isValid && !event.url.pathname.startsWith('/login')) {
        throw redirect(303, '/login');
    }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false, sameSite: 'Lax' }));

    return response;
}) satisfies Handle;