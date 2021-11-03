import {User} from "@app/store/user/user.models";
import * as fromActions from './user.actions';

export interface UserState {
  entity: User;
  uid: string;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  entity: null,
  uid: null,
  loading: null,
  error: null
};

export function reducer(state = initialState, action: fromActions.All): UserState {
  switch (action.type){
    case fromActions.Types.INIT: {
      return {...state, loading: true};
    }
    case fromActions.Types.INIT_AUTHORIZED: {
      return {...state, loading: false, entity: action.user, uid: action.uid, error: null};
    }
    case fromActions.Types.INIT_UNAUTHORIZED: {
      return {...state, loading: false, entity: null, error: null};
    }
    case fromActions.Types.INIT_ERROR: {
      return {...state, loading: false, error: action.error};
    }
    case fromActions.Types.SIGN_IN_EMAIL:{
      return {...state, loading: true}
    }
    case fromActions.Types.SIGN_IN_EMAIL_SUCCESS:{
      return {...state,entity: action.user, uid: action.uid ,loading: false, error: null};
    }
    case fromActions.Types.SIGN_IN_EMAIL_ERROR:{
      return {...state, loading: false, error: action.error}
    }
    case fromActions.Types.SIGN_UP_EMAIL:{
      return {...state, loading: true}
    }
    case fromActions.Types.SIGN_UP_EMAIL_SUCCESS:{
      return {...state,uid: action.uid ,loading: false, error: null};
    }
    case fromActions.Types.SIGN_UP_EMAIL_ERROR:{
      return {...state, loading: false, error: action.error}
    }

    case fromActions.Types.SIGN_OUT:{
      return {...state, loading: true}
    }
    case fromActions.Types.SIGN_OUT_SUCCESS:{
      return {...initialState};
    }
    case fromActions.Types.SIGN_OUT_ERROR:{
      return {...state, loading: false, error: action.error}
    }
    default:{
      return state;
    }
  }
}
