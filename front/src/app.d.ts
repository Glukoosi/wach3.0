import PocketBase from "pocketbase";

declare global {
    declare namespace App {
        interface Locals {
            pb: PocketBase
        }
    }
    interface Categories {
        [key: string]: Wachievement[]
    }

    interface Wachievement {
        id: string
        completed?: boolean
        completeId?: string
        category: string
        name: string
        pictureUrl?: string
        pictureUrlThumb?: string
        score: number
        description: string
        longDescription: string
    }
    interface User {
        id: string
        user: string
        userName: string
        avatarUrl: string
        score: number
        wachievementsCompleted?: number
    }
    
}
