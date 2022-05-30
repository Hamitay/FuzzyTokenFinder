import styled from "@emotion/styled";
import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import debounce from "lodash.debounce";
import React from "react";

type SearchBarProps = {
  onClickAddToken: () => void;
  onSearchTermChange: (search: string) => Promise<void>;
};

const SearchBarWrapper = styled(AppBar)({
});


const TextFieldWrapper = styled.div({
  flexGrow: 1,
  paddingLeft: 50,
  paddingRight: 50,
});

const StyledTextField = styled(TextField)({
  backgroundColor: "white",
  borderRadius: 10,

  ":hover": {
    opacity: 0.8,
  },
})

export const SearchBar: React.FC<SearchBarProps> = ({
  onClickAddToken,
  onSearchTermChange,
}) => {

  const [search, setSearch] = React.useState<string>("");

  const debouncedOnTextChange = React.useMemo(() => {
    return debounce((newSearch) => onSearchTermChange(newSearch), 300)
  }, [onSearchTermChange])

  const onChange =  (event: any) => {
    const newSearch = event.target.value
    setSearch(newSearch);
    debouncedOnTextChange(newSearch)
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
      <Typography variant="h5" component="div">Token Library</Typography>
      <TextFieldWrapper>
        <StyledTextField
          variant="outlined"
          fullWidth
          onChange={onChange}
          value={search}
        />
      </TextFieldWrapper>
      <Button onClick={onClickAddToken} variant="contained">Add Token</Button>

      </Toolbar>
    </AppBar>
  );
};
