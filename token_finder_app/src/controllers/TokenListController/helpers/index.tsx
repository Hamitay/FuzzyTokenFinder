import axios from "axios";
import { TokenReducerAction, TokenReducerActionTypes } from "../reducers";
import { Token } from "../sharedTypes";

const API_URL = "http://localhost:8080";

const TOKEN_PATH = `${API_URL}/tokens`;

export const getTokens = async (search?: string): Promise<Token[]> => {
  const url =
    search && search.length > 0
      ? `${TOKEN_PATH}?searchParam=${search}`
      : TOKEN_PATH;
  const { data } = await axios.get(url);
  return data;
};

export const uploadToken = async (form: FormData): Promise<Token> => {
  const response = await axios.post(TOKEN_PATH, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const dispatchPopulateTokens = (
  dispatch: (value: TokenReducerAction) => void,
  tokens: Token[]
) => {
  const action = {
    type: TokenReducerActionTypes.PopulateTokens,
    payload: {
      tokens: tokens,
    },
  };

  dispatch(action);
};

export const dispatchAddToken = (
  dispatch: (value: TokenReducerAction) => void,
  token: Token
) => {
  const action = {
    type: TokenReducerActionTypes.AddNewToken,
    payload: {
      token: token,
    },
  };

  dispatch(action);
};
