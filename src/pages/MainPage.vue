<template>
  <q-page class="row items-center justify-evenly">
    <h3 class="col-12">Edge Built-In Translate Repairer</h3>
    <q-card class="col-12" v-for="url in blacklist" :key="url">
      {{ url }}
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import {useQuasar} from 'quasar';
import {ref} from 'vue';

let blacklist = ref<string[]>([]);
const bridge = useQuasar().bex;

async function getBlacklist() {
  let blacklist = (await bridge.send('storage.get', {key: 'ebitr-blacklist'})).data;
  if (blacklist === undefined) {
    await bridge.send('storage.set', {key: 'ebitr-blacklist', value: []});
    blacklist = [];
  }
  console.log(blacklist);
  return blacklist;
}

getBlacklist().then((data) => {
  blacklist.value = data;
});
</script>
