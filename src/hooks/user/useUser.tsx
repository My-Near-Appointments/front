import { UserContextData } from "@/hooks/user/interfaces/user-context-data.interface";
import { UserProviderProps } from "@/hooks/user/interfaces/user-provider-props.interface";
import { UserState } from "@/hooks/user/interfaces/user-state.interface";
import { UserActions } from "@/hooks/user/types/user-actions.types";
import { createContext, useContext, useReducer } from "react";

const userContext = createContext<UserContextData>({
  state: { user: null, userId: '' },
  dispatch: () => {},
});

const userReducer = (state: UserState, action: UserActions): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload?.user || null,
      };
    case 'SET_USER_ID':
      return {
        ...state,
        userId: action.payload?.userId || '',

      }
    default:
      return state;
  }
};
export function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(userReducer, { user: null, userId: '' });
  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const context = useContext(userContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
}
