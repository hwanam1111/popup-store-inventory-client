import { useState, useEffect, useCallback } from 'react';

export default () => {
  const [isScanBarcodeStart, setIsScanBarcodeStart] = useState<boolean>(false);
  const [barcodeValue, setBarcodeValue] = useState<string>('');

  useEffect(() => {
    const handle = (evt: KeyboardEvent) => {
      const value = evt.key;

      // 바코드를 스캔했는지를 첫번 째 Clear Value로 확인
      if (value === 'Clear' && isScanBarcodeStart === false) {
        return setIsScanBarcodeStart(true);
      }

      // 바코드 스캔을 했는지 확인이 되면 Value를 넣음
      if (isScanBarcodeStart && value !== 'Enter' && value !== 'Clear') {
        return setBarcodeValue(barcodeValue + value);
      }

      // 바코드가 스캔된 상태에서 Enter Value가 Value 입력 종료
      if (isScanBarcodeStart && value === 'Enter') {
        return setIsScanBarcodeStart(false);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isScanBarcodeStart, barcodeValue]);

  const onResetBarcodeValue = useCallback(() => {
    setBarcodeValue('');
  }, []);

  return { isScanBarcodeStart, barcodeValue, onResetBarcodeValue };
};
