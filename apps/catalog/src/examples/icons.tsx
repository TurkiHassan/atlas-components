import { Group, ThemeIcon } from '@atlas/ui';
import { Layers3, ShieldCheck, Globe2, Sparkles, Folder, Command } from '@atlas/ui/icons';

export default function Example() {
  return (
    <Group>{[Layers3, ShieldCheck, Globe2, Sparkles, Folder, Command].map((Icon, index) => <ThemeIcon key={index} variant="default" size={42} aria-hidden="true"><Icon size={21} strokeWidth={1.5} /></ThemeIcon>)}</Group>
  );
}
