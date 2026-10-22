import { Radio, Group } from '@atlas/ui';

export default function Example() {
  return (
    <Radio.Group label="نوع المشروع" defaultValue="web"><Group mt="sm"><Radio value="web" label="تطبيق ويب" /><Radio value="dashboard" label="لوحة إدارة" /></Group></Radio.Group>
  );
}
