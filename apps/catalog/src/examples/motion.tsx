import { Button, Stack, Paper, Text } from '@atlas/ui';
import { motion, MotionConfig } from '@atlas/ui/motion';
import { useState } from 'react';

export default function Example() {
  const [expanded, setExpanded] = useState(false);
  return (
    <MotionConfig reducedMotion="user"><Stack align="center"><motion.div layout animate={{ scale: expanded ? 1.08 : 1 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}><Paper withBorder p="lg" radius="lg"><Text fw={700}>تفاصيل بحركة هادئة</Text></Paper></motion.div><Button variant="light" size="xs" onClick={() => setExpanded((current) => !current)}>تبديل الحركة</Button></Stack></MotionConfig>
  );
}
