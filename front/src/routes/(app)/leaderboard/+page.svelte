<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="overflow-x-auto w-full">
  <table class="table w-full">
    <thead>
        <th>Sija</th>
        <th>Nimi</th>
        <th>Pisteet</th>
    </thead>
    <tbody>
      {#each data.leaderboard as user, i}
        <tr class={user.id === data.profile.id ? 'active': ''}>
          <td>
            {i + 1}
          </td>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img src={user.avatarUrl} alt="avatar" />
                </div>
              </div>
              <div>
                <div class="font-bold">{user.userName}</div>
              </div>
            </div>
          </td>
          <td>
              {user.score}
          </td>
        </tr>
      {/each}
    </tbody>
    <tfoot>
        <th>Sija</th>
        <th>Nimi</th>
        <th>Pisteet</th>
    </tfoot>
  </table>
</div>