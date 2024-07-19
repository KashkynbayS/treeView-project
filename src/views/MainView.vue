<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import TreeComponent from '@/components/TreeComponent.vue';
import Loader from '@/components/loader.vue';

import treeApi from '@/api/treeApi';

import { buildTree, saveOpenItems } from '@/helpers/treeViewHelpers';

import { TreeItem } from '@/types/TreeItem';

const treeItems = ref<TreeItem[]>([]);

const isLoading = ref(false);

const fetchTreeItems = async () => {
  isLoading.value = true;
  
  try {
    const response = await treeApi.getItems();
    const items: TreeItem[] = response.data;
    const openItems = JSON.parse(localStorage.getItem('openItems') || '[]');
    treeItems.value = buildTree(items, openItems);

  } catch (error) {
    console.log(error);

  } finally {
    isLoading.value = false;
  }
};

const reload = () => {
  fetchTreeItems();
};

onMounted(() => {  
  fetchTreeItems();
});

watch(treeItems, () => saveOpenItems(treeItems.value), { deep: true });
</script>

<template>
  <div>
    <button @click="reload" :disabled="isLoading"> Reload Tree </button>

    <div class="loader-block" v-if="isLoading">
      <Loader/>
    </div>
    
    <TreeComponent v-else :items="treeItems" :parentColorIndex="0" :isRoot="true" />
  </div>
</template>

<style scoped lang="scss">
.loader-block {
  margin: 30px 50px;
}
</style>
