import { TreeItem } from '@/types/TreeItem';

export const buildTree = (items: TreeItem[], openItems: string[]): TreeItem[] => {
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

export const saveOpenItems = (treeItems: TreeItem[]) => {
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
  collectOpenItems(treeItems);
  localStorage.setItem('openItems', JSON.stringify(openIds));
};
