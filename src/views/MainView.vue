<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import TreeComponent from '../components/TreeComponent.vue';
import treeApi from '../api/treeApi';
import { TreeItem } from '../types/TreeItem';

const treeItems = ref<TreeItem[]>([]);

const fetchTreeItems = async () => {
  const response = await treeApi.getItems();
  const items: TreeItem[] = response.data;

  const openItems = JSON.parse(localStorage.getItem('openItems') || '[]');
  treeItems.value = buildTree(items, openItems);
};

const buildTree = (items: TreeItem[], openItems: string[]): TreeItem[] => {
  const map = new Map<string, TreeItem>();

  items.forEach(item => {
    map.set(item.id, { ...item, children: [], isOpen: openItems.includes(item.id) });
  });

  const roots: TreeItem[] = [];

  map.forEach(item => {
    if (item.parent_id === null) {
      roots.push(item);
    } else {
      const parent = map.get(item.parent_id);
      if (parent) {
        parent.children?.push(item);
      }
    }
  });

  return roots;
};

const reload = () => {
  fetchTreeItems();
};

const saveOpenItems = () => {  
  const openIds: string[] = [];
  const collectOpenItems = (items: TreeItem[]) => {
    items.forEach(item => {
      if (item.isOpen) {
        openIds.push(item.id);
        if (item.children) {
          collectOpenItems(item.children);
        }
      }
    });
  };
  collectOpenItems(treeItems.value);
  localStorage.setItem('openItems', JSON.stringify(openIds));
};

onMounted(() => {  
  fetchTreeItems();
});

watch(treeItems, saveOpenItems, { deep: true });
</script>

<template>
  <div>
    <button @click="reload">Reload Tree</button>
    <TreeComponent :items="treeItems" :parentColorIndex="0" :isRoot="true" />
  </div>
</template>
