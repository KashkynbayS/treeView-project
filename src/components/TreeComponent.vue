<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
import { TreeItem } from '@/types/TreeItem';
import ArrowIcon from '@/assets/icons/arrow.png';
import HyphenIcon from '@/assets/icons/hyphen.png';

const props = defineProps<{ items: TreeItem[], parentColorIndex: number, isRoot?: boolean }>();

const rootItems = ref(props.items);

const colors = ['#f0f0f0', '#d0d0d0', '#a0a0a0'];

const getItemColor = (parentColorIndex: number, currentIndex: number, isRoot: boolean) => {
  if (isRoot) {
    return colors[2];
  } else {
    return colors[(parentColorIndex + currentIndex) % 2];
  }
};

watch(props, () => {
  rootItems.value = props.items;
});

const toggle = (item: TreeItem) => {
  item.isOpen = !item.isOpen;
};
</script>

<template>
    <ul>
      <li v-for="(item, index) in rootItems" :key="item.id">
        <div
          class="title-block"
          @click="toggle(item)"
          :style="{ backgroundColor: getItemColor(props.parentColorIndex, index, props.isRoot) }"
        >
          <img
            :class="{ isOpen: item.isOpen && item.children?.length !== 0 }"
            :src="item.children?.length !== 0 ? ArrowIcon : HyphenIcon"
            alt="isOpenStatus"
          />
          <span>{{ item.title }}</span>
        </div>
        <TreeComponent
          v-if="item.isOpen && item.children"
          :items="item.children"
          :parentColorIndex="(props.parentColorIndex + index + 1) % 2"
          :isRoot="false"
        />
      </li>
    </ul>
</template>

<style scoped>
li {
  list-style-type: none;
  padding: 5px 0;

  .title-block {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    cursor: pointer;
    padding: 5px;

    span {
      display: inline-block;
    }

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
