import styled from "@emotion/styled";
import { UploadFile } from "@mui/icons-material";

const DropzonePlaceholderWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const UploadFileIconWrapper = styled.div({
  fontSize: 100,
  marginTop: 40,
});

const DropzonePlaceholder = () => (
  <DropzonePlaceholderWrapper>
    <UploadFileIconWrapper>
      <UploadFile fontSize="inherit" />
    </UploadFileIconWrapper>
    Drop your token image here...
  </DropzonePlaceholderWrapper>
);

export default DropzonePlaceholder;
