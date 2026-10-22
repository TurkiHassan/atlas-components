import { RichTextEditor } from '@atlas/ui/editor';
import { useEditor, StarterKit } from '@atlas/ui/tiptap';

export default function Example() {
  const editor = useEditor({ extensions: [StarterKit], content: '<p>ابدأ كتابة <strong>فكرتك القادمة</strong> هنا.</p>', shouldRerenderOnTransaction: true, editorProps: { attributes: { 'aria-label': 'محرر وصف المشروع', role: 'textbox', 'aria-multiline': 'true', dir: 'rtl' } } });
  return (
    <RichTextEditor editor={editor} w="100%" labels={{ boldControlLabel: "عريض", italicControlLabel: "مائل", bulletListControlLabel: "قائمة نقطية", undoControlLabel: "تراجع", redoControlLabel: "إعادة" }}><RichTextEditor.Toolbar><RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.BulletList /></RichTextEditor.ControlsGroup><RichTextEditor.ControlsGroup><RichTextEditor.Undo /><RichTextEditor.Redo /></RichTextEditor.ControlsGroup></RichTextEditor.Toolbar><RichTextEditor.Content /></RichTextEditor>
  );
}
