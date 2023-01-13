export interface ErrorOutput<T> {
  statusType: string;
  statusCode: number;
  message: T;
}
