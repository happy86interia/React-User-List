import { get } from './api';

export const getUsersReq = () => get('users');
export const getFieldsReq = () => get('fields');
