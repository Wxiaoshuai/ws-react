export interface TestTableItem {
  key: number;  // id
  disabled?: boolean;
  href: string;
  avatar: string;
  owner: string;
  name1: string;
  name2: string;
  name3: string;
  name4: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TestTableItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  status?: string;
  name1?: string;
  name2?: string;
  name3?: string;
  name4?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
