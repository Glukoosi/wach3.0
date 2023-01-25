<script lang="ts">
    import type { PageData } from './$types';

    import CompleteButton from './CompleteButton.svelte';

    export let data: PageData;
</script>

{#each Object.entries(data.categories) as [category, wachievements]}
  <article class="prose mb-4">
    <h1 id={category} class="scroll-mt-20" >{category}</h1>
  </article>
  {#each wachievements as wachievement}
    <div class="card md:card-side {wachievement.completed ? 'bg-base-300' : 'bg-base-100'} shadow-xl mb-8">
        <img class="rounded-lg object-none h-96"
         src={wachievement.pictureUrlThumb}
         alt="wachievement"
         loading="lazy"
        >
      <div class="card-body">
        <h2 class="card-title break-words">
          {wachievement.name}
          <div class="badge badge-outline badge-lg badge-accent hidden lg:flex">{wachievement.score} PISTETTÄ</div>
        </h2>
        <div class="badge badge-outline badge-lg badge-accent lg:hidden">{wachievement.score} PISTETTÄ</div>
        <p class="break-words">{wachievement.description}</p>
        <div class="card-actions justify-end">
          <CompleteButton { wachievement } profileId={data.profile.id} />
          <label for={wachievement.id} class="btn btn-secondary">lisätietoa</label>
        </div>
      </div>
    </div>
  {/each}
{/each}

{#each Object.entries(data.categories) as [_, wachievements]}
  {#each wachievements as wachievement}
  <input type="checkbox" id={wachievement.id} class="modal-toggle" />
  <label for={wachievement.id} class="modal cursor-pointer">
    <label class="modal-box w-11/12 max-w-2xl" for="">
      <img class="rounded-lg mb-4" width="650px" height="650px" loading="lazy" src={wachievement.pictureUrl} alt="wachievement"/>
      <h2 class="font-bold text-2xl">
        {wachievement.name}
        <div class="badge badge-outline badge-accent badge-lg ml-2">{wachievement.score} PISTETTÄ</div>
      </h2>
      
      <article class="prose mb-4">
      <p class="py-4">{wachievement.longDescription}</p>
      </article>
      <div class="modal-action">
        <CompleteButton { wachievement } profileId={data.profile.id} />
        <label for={wachievement.id} class="btn">Sulje</label>
      </div>
    </label>
  </label>
  {/each}
{/each}