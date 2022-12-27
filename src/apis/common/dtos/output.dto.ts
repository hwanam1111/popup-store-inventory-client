import { ErrorOutput } from '@apis/common/dtos/error.dto';

export interface CoreOutput<T> {
  ok: boolean;
  error?: ErrorOutput<T>;
  serverError?: any;
}
