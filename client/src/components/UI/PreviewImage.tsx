import { FC } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PreviewImageProps {
  fileURL: string;
}

const ImageBox = styled.div`
  width: 120px;
  max-height: 120px;
  margin: 0 2px 2px 0;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

const PreviewImage: FC<PreviewImageProps> = ({ fileURL }) => {
  return (
    <ImageBox>
      <Image src={fileURL} alt={fileURL} />
    </ImageBox>
  );
};

export default PreviewImage;
