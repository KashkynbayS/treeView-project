export interface TreeItem {
  title: string;
  parent_id: string | null;
  id: string;
  children?: TreeItem[];
  isOpen?: boolean;
}
  