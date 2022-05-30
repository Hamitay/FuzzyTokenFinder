import styled from "@emotion/styled";
import { Drawer, Button } from "@mui/material";
import { Token } from "../../sharedTypes";

type TokenDetailsPaneProps = {
  open: boolean;
  onClose: () => void;
  selectedToken: Token;
};

type TokenDetailsProps = {
  url: string;
  name: string;
};

const TokenDetailsWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: 50,
  maxWidth: 450,
  gap: 10,
});

const TokenDetailsNameWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const TokenDetails: React.FC<TokenDetailsProps> = ({ url, name }) => {
  return (
    <TokenDetailsWrapper>
      <img src={url} />
      <TokenDetailsNameWrapper>
        <div>{name}</div>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(url);
          }}
        >
          Copy to Clipboard
        </Button>
      </TokenDetailsNameWrapper>
    </TokenDetailsWrapper>
  );
};

const TokenDetailsPane: React.FC<TokenDetailsPaneProps> = ({
  open,
  onClose,
  selectedToken,
}) => (
  <Drawer anchor={"right"} open={open} onClose={onClose}>
    <TokenDetails name={selectedToken.name} url={selectedToken.url} />
    <Button onClick={onClose}>Close</Button>
  </Drawer>
);

export default TokenDetailsPane;
