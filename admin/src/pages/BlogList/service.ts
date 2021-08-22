import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';

export async function queryBlog(params?: TableListParams) {
  return request('/admin/blog', {
    params,
  });
}

export async function deleteBlog(params: { id: number[] }) {
  return request('/admin/blog', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addBlog(params: TableListItem) {
  return request('/admin/blog', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
