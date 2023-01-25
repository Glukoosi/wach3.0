<script lang="ts">
    import { enhance } from '$app/forms';

    export let profileId: string;
    export let wachievement: any;
</script>

{#if wachievement.completed}
    <form method="POST" use:enhance action="?/unCompleteWachievement">
        <input hidden value={wachievement.completeId} name="completeId" >
        <button class="btn btn-warning">Peru suoritus</button>
    </form>
{:else}
    <form method="POST" use:enhance action="?/completeWachievement">
        <input hidden value={profileId} name="profileId" >
        <input hidden value={wachievement.id} name="wachievementId" >
    <button class="btn btn-primary">Suorita</button>
    </form>
{/if}