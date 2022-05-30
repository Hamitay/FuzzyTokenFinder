import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

const StyledWrapper = styled.div({
  marginTop: 200,
  display: "grid",
  placeItems: "center"
});

const TokenListLoading = () => {
  return (
    <StyledWrapper>
      <CircularProgress size={360}/>
    </StyledWrapper>
  );
};

export default TokenListLoading;
