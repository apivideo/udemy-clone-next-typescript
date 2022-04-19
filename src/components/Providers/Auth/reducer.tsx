import { AuthContext } from './index';
export enum AuthActions {
  SET_API_KEY,
  SET_ACCESS_TOKEN,
}

export interface PayloadType {
  [key: string]: string;
}
export type Action =
  | {
      type: AuthActions.SET_API_KEY;
      payload: PayloadType;
    }
  | {
      type: AuthActions.SET_ACCESS_TOKEN;
      payload: PayloadType;
    };

const Reducer = (state: AuthContext, action: Action) => {
  switch (action.type) {
    case AuthActions.SET_API_KEY: {
      localStorage.setItem('api_key', JSON.stringify({ ...action.payload }));
      return { ...state, ...action.payload };
    }
    case AuthActions.SET_ACCESS_TOKEN: {
      localStorage.setItem(
        'access_token',
        JSON.stringify({ ...action.payload })
      );
      return { ...state, ...action.payload };
    }
    default:
      console.error('Not among actions');
  }
};

export default Reducer;
