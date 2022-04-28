<template>
  <q-page class="row q-pa-xl q-col-gutter-lg items-center">
    <div class="col">
      <q-img src="/img/psyduck.png" />
    </div>
    <div class="col">
      <h1>{{ welcomeMessage }}</h1>
      <div class="q-pa-md">
        <p class="text-body1">
          Do your friends out-do you when it comes to vague stats and unique
          species? We've got your covered...
        </p>
      </div>

      <div class="q-pa-md q-gutter-md">
        <q-btn unelevated rounded color="primary" size="xl" label="Join us" />
        <q-btn flat color="dark" size="md" label="Show me how it works" />
      </div>
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
