import { ActionIcon, Group } from '@atlas/ui';
import { Bookmark, Heart, Share2 } from '@atlas/ui/icons';

export default function Example() {
  return (
    <Group><ActionIcon size="lg" aria-label="حفظ" variant="light"><Bookmark size={19} /></ActionIcon><ActionIcon size="lg" aria-label="إعجاب" color="pink" variant="light"><Heart size={19} /></ActionIcon><ActionIcon size="lg" aria-label="مشاركة" variant="default"><Share2 size={19} /></ActionIcon></Group>
  );
}
