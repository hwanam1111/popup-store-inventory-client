import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import useImageUpload from '@hooks/useImageUpload';
import { UPLOAD_PATH } from '@apis/files/constants/upload-path';
import { UPLOAD_FILE_SIZE } from '@apis/files/constants/upload-file-size';
import Loading from '@ui/loading';
import useI18n from '@hooks/useI18n';
import { I18N_CREATE_PRODUCT } from '@constants/i18n-namespace';

const ProductImageContainer = styled.section`
  width: 100%;
  margin-top: 1.25rem;
`;

const ImageUploadButton = styled.button`
  position: relative;

  & > span {
    display: inline-block;
    margin-top: 1.25rem;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.color.G60};
    text-align: center;
    width: 100%;
  }
`;

const Image = styled.img`
  display: block;
  width: 10rem;
  height: 10rem;
  border-radius: 0.5rem;
  object-fit: cover;
  padding: 0;
  pointer-events: none;
  box-shadow: 0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075);
`;

interface UploadProductImageProps {
  setProductImage: (productImage: string) => void;
}

export default function UploadProductImage({ setProductImage }: UploadProductImageProps) {
  const { i18n } = useI18n(I18N_CREATE_PRODUCT);
  const fileInput = useRef<HTMLInputElement>(null);
  const [isImageUploadLoading, onImageUpload, productImage] = useImageUpload({
    fileUploadPath: UPLOAD_PATH.product,
    maxFileSize: UPLOAD_FILE_SIZE.productImage,
    input: fileInput,
    uploadFileTitle: 'Product Image',
    defaultImageUrl: '/images/blank-image.svg',
  });

  const onClickImageUpload = useCallback(() => {
    fileInput.current.click();
  }, []);

  useEffect(() => {
    setProductImage(productImage);
  }, [productImage]);

  return (
    <>
      {isImageUploadLoading && <Loading theme="white" />}
      <ProductImageContainer>
        <input type="file" ref={fileInput} onChange={onImageUpload} accept=".jpg, .jpeg, .png" hidden />
        <ImageUploadButton type="button" onClick={onClickImageUpload}>
          <Image src={productImage} alt="product image" />
          <span>{i18n('form.product-image.upload-title')}</span>
        </ImageUploadButton>
      </ProductImageContainer>
    </>
  );
}
