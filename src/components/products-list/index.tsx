import styled from 'styled-components';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { I18N_COMMON, I18N_PRODUCTS_LIST } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import useFetchProducts from '@apis/products/queries/fetch-products';
import usePagination from '@hooks/usePagination';
import { CountryName } from '@apis/countries/entities/country.entity';
import Pagination from '@ui/pagination';
import MainSectionTitle from '@ui/main-section-title';
import Table from '@ui/table';
import numberWithComma from '@utils/number-with-comma';
import { useCallback, useState } from 'react';
import EditProductQuantity from '@components/edit-product-quantity';
import useDeleteProduct from '@apis/products/mutations/delete-product';
import { sweetAlert, sweetConfirm } from '@libs/sweet-alert2';
import Loading from '@ui/loading';

const Container = styled.div`
  margin: 3rem auto 0 auto;
  padding: 0 3rem;
`;

const ContentBlock = styled.div`
  border: 1px solid ${({ theme }) => theme.color.G20};
  border-radius: 0.625rem;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const ProductNameImageBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const ProductImage = styled(LazyLoadImage)`
  object-fit: cover;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 0.475rem;
  background-color: ${({ theme }) => theme.color.BG30};
  padding: 0.25rem;
`;

const HaveNotProducts = styled.p``;

export default function ProductsList() {
  const router = useRouter();
  const { query } = useRouter();
  const { i18n } = useI18n(I18N_PRODUCTS_LIST);
  const { i18n: commonI18n } = useI18n(I18N_COMMON);
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());
  const [page, onChangePage] = usePagination(1);
  const limit = 15;
  const { isLoading: isProductsLoading, data: productsData } = useFetchProducts({
    limit,
    page,
    ...(country !== 'All' && { sellingCountry: country as CountryName }),
  });

  const [editProductQuantityFormOpend, setEditProductQuantityFormOpend] = useState<boolean>(false);
  const [productIdToEditQuantity, setProductIdToEditQuantity] = useState<number | null>(null);
  const [productNameToEditQuantity, setProductNameToEditQuantity] = useState<string | null>('');
  const onEditProductQuantityFormOpen = useCallback(
    (productId: number, productName: string) => () => {
      setProductIdToEditQuantity(productId);
      setProductNameToEditQuantity(productName);
      setEditProductQuantityFormOpend(true);
    },
    [],
  );
  const onEditProductQuantityFormClose = useCallback(() => {
    setEditProductQuantityFormOpend(false);
    setProductIdToEditQuantity(null);
    setProductNameToEditQuantity(null);
  }, []);

  const { isLoading: isDeleteProductLoading, mutate: deleteProductMutate } = useDeleteProduct();
  const onDeleteProduct = useCallback(
    (productId: number, productName: string) => () => {
      if (!isDeleteProductLoading) {
        sweetConfirm
          .fire({
            title: `[${productName}] ${i18n('delete-product.confirm-message')}`,
            confirmButtonText: i18n('delete-product.confirm-button'),
          })
          .then((confirmResult) => {
            if (confirmResult.isConfirmed) {
              deleteProductMutate(
                {
                  productId,
                },
                {
                  onSuccess: (result) => {
                    if (result?.ok) {
                      sweetAlert
                        .fire({
                          icon: 'success',
                          titleText: i18n('delete-product.result.success'),
                          confirmButtonText: i18n('delete-product.result.confirm-button'),
                        })
                        .then((swalResult) => {
                          if (swalResult) {
                            router.reload();
                          }
                        });
                    }
                  },
                  onError: (err) => {
                    if (err.response?.data?.error) {
                      return sweetAlert
                        .fire({
                          icon: 'error',
                          titleText: i18n(`delete-product.result.error.${err.response?.data?.error.message}`),
                          confirmButtonText: i18n('delete-product.result.confirm-button'),
                        })
                        .then((swalResult) => {
                          if (swalResult) {
                            router.reload();
                          }
                        });
                    }

                    return sweetAlert
                      .fire({
                        icon: 'error',
                        titleText: commonI18n('api.server-error.message'),
                        confirmButtonText: commonI18n('api.server-error.confirm-button'),
                      })
                      .then((swalResult) => {
                        if (swalResult) {
                          router.reload();
                        }
                      });
                  },
                },
              );
            }
          });
      }
    },
    [isDeleteProductLoading],
  );

  return (
    <Container>
      {isProductsLoading && <Loading theme="white" />}
      <MainSectionTitle title={i18n('page-title')} />
      <ContentBlock>
        {productsData &&
          (productsData.products?.length > 0 ? (
            <Table
              th={[
                i18n('table.th.product-name'),
                i18n('table.th.barcode'),
                i18n('table.th.selling-country'),
                i18n('table.th.product-amount'),
                i18n('table.th.product-quantity'),
                i18n('table.th.sold-quantity'),
                i18n('table.th.canceled-quantity'),
                i18n('table.th.defective-quantity'),
                i18n('table.th.damage-quantity'),
                i18n('table.th.edit-product-quantity'),
                i18n('table.th.delete-product'),
              ]}
            >
              {productsData.products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <ProductNameImageBlock>
                      <ProductImage effect="blur" src={product.productImage} alt={product.productName} />
                      <span>{product.productName}</span>
                    </ProductNameImageBlock>
                  </td>
                  <td>{product.barcode}</td>
                  <td>{product.sellingCountry}</td>
                  <td>
                    {product.sellingCurrency} {numberWithComma(product.productAmount)}
                  </td>
                  <td>{numberWithComma(product.productQuantity)}</td>
                  <td>{numberWithComma(product.soldQuantity)}</td>
                  <td>{numberWithComma(product.canceledQuantity)}</td>
                  <td>{numberWithComma(product.defectiveQuantity)}</td>
                  <td>{numberWithComma(product.damageQuantity)}</td>
                  <td>
                    <button
                      type="button"
                      className="button-icon"
                      onClick={onEditProductQuantityFormOpen(product.id, product.productName)}
                    >
                      <img src="/images/edit.png" alt="edit product" />
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="button-icon"
                      onClick={onDeleteProduct(product.id, product.productName)}
                    >
                      <img src="/images/delete.png" alt="delete product" />
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
          ) : (
            <HaveNotProducts>{i18n('have-not-products')}</HaveNotProducts>
          ))}
        {productsData?.products.length > 0 && (
          <Pagination
            page={page}
            onChangePage={onChangePage}
            maxPageItemCount={limit}
            totalItemCount={productsData?.totalResults || 0}
          />
        )}
      </ContentBlock>
      {editProductQuantityFormOpend && (
        <EditProductQuantity
          productId={productIdToEditQuantity}
          productName={productNameToEditQuantity}
          onClose={onEditProductQuantityFormClose}
        />
      )}
    </Container>
  );
}
