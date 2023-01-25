import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (({ locals }) => {
    locals.pb.authStore.clear();
    throw redirect(303, '/login');
}) satisfies RequestHandler;