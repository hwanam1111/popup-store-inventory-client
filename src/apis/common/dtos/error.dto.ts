export interface ErrorOutput {
  error: {
    statusType: string;
    statusCode: number;
    message: string | string[];
  };
}
