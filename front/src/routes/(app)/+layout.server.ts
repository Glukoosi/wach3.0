import type { LayoutServerLoad } from './$types';
import { groupByCategory, constructWachievements, constructLeaderboard } from '$lib/server/utils';

export const load = (async ({ locals }) => {
    const usersRaw = await locals.pb.collection('userProfiles').getFullList(1000, {
        expand: 'completedWachievements(profile).wachievement'
    })
    const wachievementsRaw = await locals.pb.collection('wachievements').getFullList(1000, {
        expand: 'completedWachievements(wachievement).profile'
    })

    const leaderboard = constructLeaderboard(usersRaw)
    const wachievements = constructWachievements(wachievementsRaw, locals)

    const profileIndex = leaderboard.findIndex((profile: { user: string | undefined; }) =>
        profile.user === locals.pb.authStore.model?.id)

    return {
        categories: groupByCategory(wachievements),
        leaderboard: leaderboard,
        profile: leaderboard[profileIndex],
        stats: {
            placement: profileIndex + 1,
            wachievementsCount: wachievementsRaw?.length,
        }
    }

}) satisfies LayoutServerLoad;