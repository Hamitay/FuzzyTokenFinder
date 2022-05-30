import { Reducer } from "react";

export enum TokenReducerActionTypes {
  PopulateTokens,
  AddNewToken,
}

export interface TokenReducerAction {
  type: TokenReducerActionTypes;
  payload?: any;
}

interface TokenState {
  tokens: any[];
}

export const tokenInitialState: TokenState = { tokens: [] };

export const tokenReducer: Reducer<TokenState, TokenReducerAction> = (
  state: TokenState,
  action: TokenReducerAction
): TokenState => {
  switch (action.type) {
    case TokenReducerActionTypes.PopulateTokens:
      return { tokens: action.payload.tokens };
    case TokenReducerActionTypes.AddNewToken:
      const newState = { tokens: [...state.tokens, action.payload.token] };
      return newState;
    default:
      return state;
  }
};
