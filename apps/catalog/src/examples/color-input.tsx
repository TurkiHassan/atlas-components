import { ColorInput } from '@atlas/ui';

export default function Example() {
  return (
    <ColorInput w="100%" label="اللون الأساسي" eyeDropperButtonProps={{ "aria-label": "التقاط لون من الشاشة" }} defaultValue="#0f766e" format="hex" swatches={["#0f766e", "#2563eb", "#b45309", "#be185d"]} />
  );
}
