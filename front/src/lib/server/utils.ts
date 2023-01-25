export const groupByCategory = (wachievements: Wachievement[]): Categories => {
    return wachievements.reduce((categories: Categories, wach: Wachievement) => {
        (categories[wach['category']] = categories[wach['category']] || []).push(wach);
        return categories;
    }, {});
};

export const constructWachievements = (wachievementsRaw: any[], locals: App.Locals): Wachievement[] => {
    return wachievementsRaw.map((wachievementRaw: any) => {
        const completedAchievements = wachievementRaw.expand['completedWachievements(wachievement)'];

        const wachievement: Wachievement = {
            id: wachievementRaw.id,
            name: wachievementRaw.name,
            category: wachievementRaw.category,
            score: wachievementRaw.score,
            description: wachievementRaw.description,
            longDescription: wachievementRaw.longDescription,
        }

        wachievement.completed = false;
        if (completedAchievements) {
            const result = completedAchievements.find((completedAchievement: any) =>
                completedAchievement.expand.profile.user === locals.pb.authStore.model?.id)
            if (result) {
                wachievement.completed = true;
                wachievement.completeId = result.id;
            }
        }

        wachievement.pictureUrl = locals.pb.getFileUrl(
            wachievementRaw,
            wachievement.completed ? wachievementRaw.pictureCompleted : wachievementRaw.picture,
            { 'thumb': '650x650' })
        wachievement.pictureUrlThumb = locals.pb.getFileUrl(
            wachievementRaw,
            wachievement.completed ? wachievementRaw.pictureCompleted : wachievementRaw.picture,
            { 'thumb': '400x400' })

        return wachievement
    });
}

export const constructLeaderboard = (usersRaw: any): User[] => {
    return usersRaw.map((userRaw: any) => {
        const user: User = {
            id: userRaw.id,
            user: userRaw.user,
            userName: userRaw.userName,
            avatarUrl: userRaw.avatarUrl,
            score: 0,
        }
        const wachievements = userRaw.expand['completedWachievements(profile)']
        user.score = 0
        user.wachievementsCompleted = wachievements?.length || 0
        if (wachievements) {
            wachievements.map((wachievement: any) => {
                user.score = user.score + wachievement.expand.wachievement.score
            })
        }
        return user;
    }).sort((a: User, b: User) => b.score - a.score)
}