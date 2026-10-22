import { Pagination } from '@atlas/ui';

export default function Example() {
  return (
    <Pagination total={8} defaultValue={2} getControlProps={(control) => ({ "aria-label": ({ first: "الأولى", last: "الأخيرة", next: "التالية", previous: "السابقة" })[control] })} />
  );
}
