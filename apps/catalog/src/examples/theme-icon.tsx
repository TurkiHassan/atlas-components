import { ThemeIcon, Group } from '@atlas/ui';
import { ShieldCheck, Layers3, Zap } from '@atlas/ui/icons';

export default function Example() {
  return (
    <Group><ThemeIcon size={46} radius="xl" variant="light"><ShieldCheck /></ThemeIcon><ThemeIcon size={46} radius="xl" variant="light" color="blue"><Layers3 /></ThemeIcon><ThemeIcon size={46} radius="xl" variant="light" color="orange"><Zap /></ThemeIcon></Group>
  );
}
