<template>
  <q-page class="q-px-md">
    <div class="q-pa-none">
      <h1 class="text-overline">Find a Pokemon</h1>
      <div class="q-pa-none">
        <q-select
          standout
          stack-label
          use-input
          hide-selected
          filled
          label="Try typing their name..."
        >
          <template v-slot:after>
            <q-btn round color="primary" icon="search" />
          </template>
        </q-select>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <h2>Tiny tim</h2>
        <q-img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
          alt="An embarrassed Psyduck"
        />
      </div>
      <div class="col-xs-12 col-md-6"></div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const welcomeMessage = 'For those embarrassing Pokemon moments...';
    return { welcomeMessage };
  },
});
</script>
