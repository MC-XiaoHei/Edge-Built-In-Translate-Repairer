<template>
  <q-page class="row items-center justify-center">
    <q-space/>
    <div class="col-12 row items-center" style="width: 500px">
      <h5 class="col-12 text-center">Edge Built-In Translate Repairer</h5>
      <div class="q-pa-md col-12 row justify-center items-center"
           v-for="url in blacklist" :key="url">
        <q-card style="width: 300px">
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label>{{ url }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn flat round dense icon="delete"/>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-space/>
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
