import React, { useReducer } from "react";
import { AddTokenDialog } from "./features/AddTokenDialog";
import { SearchBar } from "./features/SearchBar";
import TokenDetailsPane from "./features/TokenDetailsPane";
import TokenList from "./features/TokenList";
import { dispatchAddToken, dispatchPopulateTokens, getTokens } from "./helpers";
import { tokenInitialState, tokenReducer } from "./reducers";
import { Token } from "./sharedTypes";


const TokenListController = () => {
  const [selectedToken, setSelectedToken] = React.useState<Token | undefined>(
    undefined
  );
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isAddTokenOpen, setIsAddTokenOpen] = React.useState<boolean>(false);
  const [loading, setIsLoading] = React.useState(false);

  const [tokenState, dispatch] = useReducer(tokenReducer, tokenInitialState);

  React.useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      const fetchedTokens = await getTokens();
      dispatchPopulateTokens(dispatch, fetchedTokens);
      setIsLoading(false);
    };

    fetchTokens();
  }, []);

  const onTokenClick = React.useCallback((token: Token) => {
    setSelectedToken(token);
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = React.useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const openAddToken = () => {
    setIsAddTokenOpen(true);
  };

  const closeAddToken = () => {
    setIsAddTokenOpen(false);
  };

  const onAddToken = (newToken: Token) => {
    dispatchAddToken(dispatch, newToken);
  };

  const searchTokens = async (search: string) => {
    setIsLoading(true);
    const fetchedTokens = await getTokens(search);
    setIsLoading(false);
    dispatchPopulateTokens(dispatch, fetchedTokens);
  };

  return (
    <>
      <SearchBar
        onClickAddToken={openAddToken}
        onSearchTermChange={searchTokens}
      />
      <TokenList tokens={tokenState.tokens} onTokenClick={onTokenClick} loading={loading}/>
      {selectedToken && (
        <TokenDetailsPane
          open={isDrawerOpen}
          onClose={closeDrawer}
          selectedToken={selectedToken}
        />
      )}
      <AddTokenDialog
        isOpen={isAddTokenOpen}
        onClose={closeAddToken}
        onAddToken={onAddToken}
      />
    </>
  );
};

export default TokenListController;
