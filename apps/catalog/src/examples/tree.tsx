import { Tree } from '@atlas/ui';

export default function Example() {
  return (
    <Tree aria-label="شجرة ملفات المشروع" data={[{ value: "src", label: "src", children: [{ value: "components", label: "components", children: [{ value: "button", label: "button.tsx" }] }, { value: "app", label: "App.tsx" }] }, { value: "docs", label: "docs" }]} />
  );
}
