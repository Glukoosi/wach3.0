import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
    completeWachievement: async ({ request, locals }) => {
        const data = await request.formData();
        const profileId = data.get('profileId')
        const wachievementId = data.get('wachievementId')

        if (!profileId) {
            return fail(400);
        }

        try {
            await locals.pb.collection('completedWachievements').create({
                profile: profileId,
                wachievement: wachievementId
            });
            return { success: true };
        } catch (err) {
            return fail(400);
        }
    },

    unCompleteWachievement: async ({ request, locals }) => {
        const data = await request.formData();
        const completeId = data.get('completeId') as string;

        if (!completeId) {
            return fail(400);
        }

        try {
            await locals.pb.collection('completedWachievements').delete(completeId);
            return { success: true };
        } catch (err) {
            return fail(400);
        }
    }
};