import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data';

export async function queryOssList(params?: TableListParams) {
  return request('/admin/ossList', {
    params,
  });
}

export async function deleteOss(params: { name: number[] }) {
  return request('/admin/ossList', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addOss(params: TableListItem) {
  return request('/admin/blog', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
