import { AxiosError } from 'axios';

export type AxiosResult<T> = {
  onError?: (error: AxiosError<any, any>) => void;
  onSuccess?: (data: T) => void;
};
