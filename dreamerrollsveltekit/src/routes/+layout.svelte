<script>
  import Dashboard from "$lib/componets/Dashboard.svelte";
  import {applyAction, enhance} from "$app/forms"

  //export let data;

</script>
<div>
  <!--<header class="bg-gray-900">
    <nav class="mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="src/Assets/Dreamer-Logo.webp" alt="Dreamer Logo">
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        {#if data}
          <a href="/" class="text-sm mx-1 font-semibold leading-6 text-white">Logout</a>
        <li><a href="/"> Signed in as {data.email}</a></li>
   <{:else }
      <div class="flex">
        <a href="/Signup" class="text-sm mx-1 font-semibold leading-6 text-white">Register</a>
        <a href="/Login" class="text-sm mx-1 font-semibold leading-6 text-white">Log in <span aria-hidden="true">&rarr;</span></a>
      </div>
    {/if}
      </div>
    </nav>
  </header> -->
  <Dashboard />
  <main class="pl-36">
    <slot />
  </main>
</div>

