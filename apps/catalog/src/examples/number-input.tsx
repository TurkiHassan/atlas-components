import { NumberInput } from '@atlas/ui';

export default function Example() {
  return (
    <NumberInput w="100%" label="الميزانية" suffix=" ر.س" min={0} max={1000000} thousandSeparator="," defaultValue={25000} />
  );
}
