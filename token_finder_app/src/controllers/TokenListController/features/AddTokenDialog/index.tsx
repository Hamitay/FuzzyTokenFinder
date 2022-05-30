import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Buffer } from "buffer";
import styled from "@emotion/styled";
import DropzoneArea from "./components/DropzoneArea";
import { uploadToken } from "../../helpers";

const ACCEPTED_MIME_TYPES = {
  "image/png": [".png"],
  "image/jpeg": [".jpeg", ".jpg"],
  "image/gif": [".gif"],
  "image/webp": [".webp"],
};

const MAX_FILES = 1;

const DialogContentWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  width: 270,
  padding: 15,
  gap: 15,
});

type AddTokenDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddToken: (newToken: any) => void;
};

export const AddTokenDialog: React.FC<AddTokenDialogProps> = ({
  isOpen,
  onClose,
  onAddToken,
}) => {
  const [tokenImage, setTokenImage] = React.useState<string | undefined>(
    undefined
  );
  const [tokenFile, setTokenFile] = React.useState<any>(undefined);
  const [tokenError, setTokenError] = React.useState<boolean>(false);

  const [name, setName] = React.useState<string>("");
  const [nameError, setNameError] = React.useState<boolean>(false);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];

    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const buffer = Buffer.from(arrayBuffer);
      const thumbnailBinary = buffer.toString("base64");
      setTokenFile(uploadedFile);
      setTokenImage(thumbnailBinary);
    };

    reader.readAsArrayBuffer(uploadedFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ACCEPTED_MIME_TYPES,
    maxFiles: MAX_FILES,
  });

  const onSubmit = async () => {
    if (!name) {
      setNameError(true);
    }

    if (!tokenFile) {
      setTokenError(true);
    } else {
      setIsLoading(true);

      const bodyFormData = new FormData();
      bodyFormData.append("name", name);
      bodyFormData.append("tokenImage", tokenFile);
      const newToken = await uploadToken(bodyFormData);
      console.log(newToken)
      onAddToken({
        ...newToken,
        url: `data:image/png;base64,${tokenImage}`,
      });
      setIsLoading(false);
      onClose();

      // Clears modal
      setTokenImage(undefined);
      setTokenFile(undefined);
      setName("");
    }
  };

  const onTextChange = (event: any) => {
    setName(event.target.value);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Token</DialogTitle>
      <DialogContent dividers>
        <DialogContentWrapper>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <DropzoneArea
              image={tokenImage}
              error={tokenError}
              isLoading={isLoading}
            />
          </div>
          <TextField
            label="Name"
            error={nameError}
            helperText={"Insert the name"}
            onChange={onTextChange}
            value={name}
          />
          <Button color={"primary"} variant={"contained"} onClick={onSubmit}>
            Submit
          </Button>
        </DialogContentWrapper>
      </DialogContent>
    </Dialog>
  );
};
