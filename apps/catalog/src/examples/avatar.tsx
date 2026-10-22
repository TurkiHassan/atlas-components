import { Avatar, Group } from '@atlas/ui';

export default function Example() {
  return (
    <Group><Avatar color="teal" radius="xl">تر</Avatar><Avatar color="blue" radius="xl">نو</Avatar><Avatar.Group><Avatar color="violet">أ</Avatar><Avatar color="pink">ب</Avatar><Avatar>+3</Avatar></Avatar.Group></Group>
  );
}
