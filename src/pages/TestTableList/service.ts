import request from 'umi-request';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/wsTest', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/wsTest', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/wsTest/create', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/wsTest', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
