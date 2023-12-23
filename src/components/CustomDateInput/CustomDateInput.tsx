import { forwardRef } from 'react';

import { Input, InputProps } from '@chakra-ui/react';

function CustomDateInput(
  { value, onClick, onChange, ...rest }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <>
      <Input
        {...rest}
        autoComplete="off"
        value={value}
        ref={ref}
        onClick={onClick}
        onChange={onChange}
        w='full'
      />
    </>
  );
}

export default forwardRef(CustomDateInput);
