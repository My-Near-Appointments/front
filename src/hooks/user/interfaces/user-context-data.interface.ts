import { Dispatch } from 'react';

import { UserState } from '@/hooks/user/interfaces/user-state.interface';
import { UserActions } from '@/hooks/user/types/user-actions.types';

export interface UserContextData {
  state: UserState;
  dispatch: Dispatch<UserActions>;
}
