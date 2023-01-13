import { useState, useEffect, useCallback } from 'react';

export default () => {
  const SCANNER_INPUT_TIMEOUT = 300;
  const [isScanBarcodeStart, setIsScanBarcodeStart] = useState<boolean>(false);
  const [barcodeValue, setBarcodeValue] = useState<string>('');
  const [finalBarcode, setFinalBarcode] = useState<string>('');

  useEffect(() => {
    const handle = (evt: KeyboardEvent) => {
      const value = evt.key;

      if (value.length === 1) {
        if (!isScanBarcodeStart) {
          setIsScanBarcodeStart(true);
        }

        return setBarcodeValue(barcodeValue + value);
      }

      if (value === 'Enter') {
        return setFinalBarcode(barcodeValue);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isScanBarcodeStart, barcodeValue]);

  // 바코드 스캐닝 시간이 지나면 value 및 바코드 스캔 초기화
  useEffect(() => {
    if (isScanBarcodeStart) {
      setTimeout(() => {
        setBarcodeValue('');
        setIsScanBarcodeStart(false);
      }, SCANNER_INPUT_TIMEOUT);
    }
  }, [isScanBarcodeStart]);

  const onResetBarcodeValue = useCallback(() => {
    setBarcodeValue('');
    setFinalBarcode('');
  }, []);

  return { isScanBarcodeStart, barcodeValue, finalBarcode, onResetBarcodeValue };
};
