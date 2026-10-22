import { Breadcrumbs, Anchor, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Breadcrumbs><Anchor href="#catalog" size="sm">المكتبة</Anchor><Anchor href="#catalog" size="sm">التنقل</Anchor><Text size="sm">مسار التصفح</Text></Breadcrumbs>
  );
}
