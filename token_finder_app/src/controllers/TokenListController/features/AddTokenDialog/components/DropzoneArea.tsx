import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import DropzonePlaceholder from "./DropzonePlaceholder";

type DropzoneAreaProps = {
  image?: string;
  error: boolean;
  isLoading?: boolean;
};

const CircularProgressWrapper = styled.div({
  marginTop: 80,
});

const Loading = () => (
  <CircularProgressWrapper>
    <CircularProgress size={80} />
  </CircularProgressWrapper>
);

const DropzoneAreaWrapper = styled.div<DropzoneAreaProps>(({ error }) => ({
  height: 250,
  backgroundColor: "#dcdcdc",
  borderStyle: "dashed",
  borderColor: error ? "#d32f2f" : "#969696",
  ...(error && { color: "#d32f2f" }),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const DropzoneArea: React.FC<DropzoneAreaProps> = ({
  image,
  error,
  isLoading,
}) => {
  const Thumbnail = () => (
    <img
      alt="Embedded Image"
      src={`data:image/png;base64,${image}`}
      height={"100%"}
    />
  );

  if (isLoading) {
    return (
      <DropzoneAreaWrapper error={error}>
        <Loading />
      </DropzoneAreaWrapper>
    );
  }

  return (
    <DropzoneAreaWrapper error={error}>
      {image ? <Thumbnail /> : <DropzonePlaceholder />}
    </DropzoneAreaWrapper>
  );
};

export default DropzoneArea;
