<template>
  <q-page class="fit row items-center justify-evenly">
    AAAAA
    <q-toggle v-model="enable"  color="primary" keep-color/>
  </q-page>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';

const enable = ref(inBlacklist());
let blackList = ref([]);

watch(enable, (newValue, oldValue) => {
  console.log(`enable changed from ${oldValue} to ${newValue}`);
  // blackList.push(window.location.href);
  // chrome.storage.sync.set({'ebitr-black-list': blackList});
});

async function inBlacklist() {
  chrome.storage.sync.get('ebitr-black-list').then((result) => {
    blackList.value = result['ebitr-black-list'] || [];
  });
  console.log(blackList)
  return true;
}
</script>
