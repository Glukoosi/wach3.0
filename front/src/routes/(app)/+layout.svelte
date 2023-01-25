<script lang="ts">
  import "../app.css";
	import type { LayoutData } from "./$types";
  export let data: LayoutData;

  const handleDrawerClose = () => {
    document.getElementById('my-drawer-3')?.click()
  }
</script>

<div class="drawer">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
  <div class="drawer-content flex flex-col">
    <div class="navbar bg-base-300 sticky top-0 z-50">
      <div class="navbar-start sticky">
        <div class="dropdown inline-block">
          <label for="my-drawer-3" class="btn btn-square btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
        </div>
        <a href="/" class="btn btn-ghost normal-case text-xl hidden lg:flex">Wach</a>
      </div>
      <div class="navbar-center lg:hidden">
        <a href="/" class="btn btn-ghost normal-case text-xl">Wach</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a href="/">Wachievements</a></li>
          <li><a href="/leaderboard">Johtajalauta</a></li>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <li id="menu5" tabindex="0">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
              Kategoriat
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul class="p-2 bg-base-100 z-50">
              {#each Object.entries(data.categories) as [category]}
              <li><a href="/#{category}">{category}</a></li>
              {/each}
            </ul>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="avatar" src={data.profile.avatarUrl} />
            </div>
          </label>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/logout" data-sveltekit-preload-data="off">Logout</a></li>
          </ul>
        </div>
      </div>
  </div>
  <div class="container mx-auto mt-4 px-4">
    <div class="stats stats-vertical md:stats-horizontal shadow mb-4 grid place-items-center">
  
    <div class="stat place-items-center">
      <div class="stat-title">Pisteet</div>
      <div class="stat-value">{data.profile.score}</div>
    </div>
    
    <div class="stat place-items-center">
      <div class="stat-title">Suoritetut</div>
      <div class="stat-value">{data.profile.wachievementsCompleted}/{data.stats.wachievementsCount}</div>
    </div>
    
    <div class="stat place-items-center">
      <div class="stat-title">Sijoitus</div>
      <div class="stat-value">{data.stats.placement}.</div>
    </div>
    
  </div>
  <slot />
  </div>
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay"></label> 
    <ul class="menu p-4 w-80 bg-base-100">
      <li><a href="/" on:click={handleDrawerClose}>Wachievements</a></li>
      <li><a href="/leaderboard" on:click={handleDrawerClose}>Johtajalauta</a></li>
      <li></li>
      <li class="menu-title"><span>Kategoriat</span></li>
      {#each Object.entries(data.categories) as [category]}
      <li><a href="/#{category}" on:click={handleDrawerClose}>{category}</a></li>
      {/each}
    </ul>
  </div>
</div>
