export interface RsNormal {
  code: number;
  message: string;
}

export interface RsUserLogin extends RsNormal {
  data?: {
    userId: string;
    username: string;
    token: string;
    permission: string;
  };
}
