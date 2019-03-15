import request from '@/utils/request';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function allEnumList() {
  return request(`${PREFIX_PATH}/baseinfo/sys/allEnumList`);
}

// post
export async function query(params) {
  return request(`${PREFIX_PATH}/baseinfo/sys/enumList`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}