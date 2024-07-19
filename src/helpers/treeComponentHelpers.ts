import { TreeItem } from '@/types/TreeItem';

const colors = ['#f0f0f0', '#d0d0d0', '#a0a0a0'];

export const getItemColor = (parentColorIndex: number, currentIndex: number, isRoot?: boolean) => {
  if (isRoot) {
    return colors[2];
  } else {
    return colors[(parentColorIndex + currentIndex) % 2];
  }
};

export const toggleItem = (item: TreeItem) => {
  item.isOpen = !item.isOpen;
};
