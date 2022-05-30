import styled from "@emotion/styled";
import {
  ImageList,
  ImageListItem,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Token } from "../../sharedTypes";
import TokenListLoading from "./components/TokenListLoading";

const TokenListWrapper = styled.div({});

type TokenListProps = {
  tokens: Token[];
  onTokenClick: (token: Token) => void;
  loading: boolean;
};

type TokenItemProps = {
  id: string;
  url: string;
  name: string;
  onClick: (token: any) => void;
};

const HoverableImageListItem = styled(ImageListItem)({
  ":hover": {
    opacity: 0.3,
    background: "#EBEBEB",
  },
});

const TokenItem: React.FC<TokenItemProps> = ({ id, url, name, onClick }) => {
  return (
    <Tooltip title={name} followCursor>
      <HoverableImageListItem
        key={id}
        onClick={() => {
          onClick({ name, url });
        }}
      >
        <img src={url} key={url} loading={"lazy"} />
      </HoverableImageListItem>
    </Tooltip>
  );
};

const TokenList: React.FC<TokenListProps> = ({
  tokens,
  onTokenClick,
  loading,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading) {
    return <TokenListLoading />;
  }

  const cols = isSmallScreen ? 2 : 12;

  return (
    <TokenListWrapper>
      <ImageList cols={cols}>
        {tokens.map((token) => (
          <TokenItem
            key={`${token.id}-${token.url}`}
            name={token.name}
            id={token.id}
            url={token.url}
            onClick={onTokenClick}
          />
        ))}
      </ImageList>
    </TokenListWrapper>
  );
};

export default TokenList;
