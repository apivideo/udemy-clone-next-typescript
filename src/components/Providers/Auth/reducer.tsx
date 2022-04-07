import { AuthContext } from './index';
export enum AuthActions {
  SET_API_KEY,
  SET_ACCESS_TOKEN,
}

export interface PayloadType {
  [key: string]: any;
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
    case AuthActions.SET_API_KEY:
    case AuthActions.SET_ACCESS_TOKEN: {
      return { ...state, ...action.payload };
    }

    default:
      console.error('Not among actions');
  }
};

export default Reducer;
