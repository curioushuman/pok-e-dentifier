<template>
  <q-layout class="bg-grey-1">
    <q-header
      elevated
      class="text-white"
      style="background: #24292e"
      height-hint="61.59"
    >
      <q-toolbar class="q-py-sm q-px-md">
        <a-logo />

        <q-toolbar-title> Pok-E-Dentifier </q-toolbar-title>

        <q-space />

        <div
          v-if="$q.screen.gt.sm"
          class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap"
        >
          <a-button label="Join us" button-type="toolbar" />

          <a href="javascript:void(0)" class="text-white"> Sign in </a>
        </div>

        <!-- <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            :ripple="false"
            size="19px"
            color="white"
            class="q-mr-sm"
            no-caps
          >
            <q-avatar round size="28px">
              <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
            </q-avatar>

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>Signed in as <strong>Mary</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

import ALogo from 'components/atoms/ALogo.vue';
import AButton from 'components/atoms/AButton.vue';

const stringOptions = [
  'quasarframework/quasar',
  'quasarframework/quasar-awesome',
];

export default {
  name: 'MarketingLayout',
  components: { ALogo, AButton },

  setup() {
    const text = ref('');
    const options = ref(null);
    const filteredOptions = ref([]);
    const search = ref(null); // $refs.search

    function filter(val, update) {
      if (options.value === null) {
        // load data
        setTimeout(() => {
          options.value = stringOptions;
          search.value.filter('');
        }, 2000);
        update();
        return;
      }

      if (val === '') {
        update(() => {
          filteredOptions.value = options.value.map((op) => ({ label: op }));
        });
        return;
      }

      update(() => {
        filteredOptions.value = [
          {
            label: val,
            type: 'In this repository',
          },
          {
            label: val,
            type: 'All GitHub',
          },
          ...options.value
            .filter((op) => op.toLowerCase().includes(val.toLowerCase()))
            .map((op) => ({ label: op })),
        ];
      });
    }

    return {
      text,
      options,
      filteredOptions,
      search,

      filter,
    };
  },
};
</script>

<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden

    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #0366d6
    color: white

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9

  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
