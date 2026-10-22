import { NavLink } from '@atlas/ui';
import { Layers3, Folder } from '@atlas/ui/icons';

export default function Example() {
  return (
    <div style={{ width: "100%" }}><NavLink label="مكتبة المكونات" active leftSection={<Layers3 size={18} />} childrenOffset={28} defaultOpened><NavLink label="المكونات الأساسية" href="#catalog" /><NavLink label="النماذج" href="#catalog" /></NavLink><NavLink label="المشروعات" leftSection={<Folder size={18} />} href="#catalog" /></div>
  );
}
