<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
import { TreeItem } from '@/types/TreeItem';
import ArrowIcon from '@/assets/icons/arrow.png';
import HyphenIcon from '@/assets/icons/hyphen.png';

const props = defineProps<{ items: TreeItem[]; startColorIndex?: number }>();

const rootItems = ref(props.items);
const startColorIndex = ref(props.startColorIndex || 0);

watch(props, () => {
  rootItems.value = props.items;
});

const toggle = (item: TreeItem) => {
  item.isOpen = !item.isOpen;
};
</script>

<template>
  <div>
    <ul>
      <li v-for="item in rootItems" :key="item.id" >
        <div class="title-block" @click="toggle(item)">
          <img 
            :class="{ isOpen : item.isOpen && item.children?.length !== 0 }" 
            :src="item.children?.length !== 0 ? ArrowIcon : HyphenIcon" 
            alt="isOpenStatus"
          >
          <span>{{ item.title }}</span>
          <!-- <span :style="{ backgroundColor: item.bgColor || '#f0f0f0' }">{{ item.title }}</span> -->
        </div>
        <TreeComponent v-if="item.isOpen && item.children" :items="item.children" :startColorIndex="startColorIndex" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {
  list-style-type: none;
  padding: 5px 0;

  .title-block {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 10px;
      height: 10px;
      transition: transform 0.1s ease;
    }

    img.isOpen {
      transform: rotate(90deg);
    }
  }
}
</style>
