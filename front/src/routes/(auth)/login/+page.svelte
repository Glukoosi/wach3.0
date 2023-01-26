<script lang="ts">
	import { browser } from '$app/environment';
    import type { PageData } from './$types';

    export let data: PageData;

    const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

    const saveProvider = (provider: any) => {
        if (browser) {
            document.cookie = `state=${JSON.stringify(provider)}`;
        }
    }

</script>

<div class="grid place-items-center ">
    <h1 class="font-medium leading-tight text-5xl mt-0 mb-2">Wach</h1>
    {#each data.authProviders as provider}
        <a class="btn btn-primary mt-2" href={`${provider.authUrl}${redirectUrl}`} on:click={() => saveProvider(provider)}>Login with {provider.name}</a>
    {/each}
</div>