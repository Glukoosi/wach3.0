import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals }) => {
    const authMethods = await locals.pb.collection('users').listAuthMethods();
    return { authProviders: authMethods.authProviders }

}) satisfies PageServerLoad;

export const actions: Actions = {
    completeWachievement: async ({ request, locals }) => {
        const data = await request.formData(); 
        const wachievementId = data.get('wachievementId')
        const profileId = locals.pb.authStore.model?.profile.id

        if (!profileId) {
            return { success: false };
        }

        try {
            await locals.pb.collection('completedWachievements').create({
                user: profileId,
                wachievement: wachievementId
            });
        return { success: true };
        } catch (err) {
            console.log(err)
            return { success: false };
        }
    }
  };
