import { Stack, Switch } from '@atlas/ui';

export default function Example() {
  return (
    <Stack><Switch label="تفعيل الإشعارات" defaultChecked /><Switch label="تقارير أسبوعية" color="blue" /></Stack>
  );
}
