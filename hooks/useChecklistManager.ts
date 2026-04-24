import { ChecklistItem } from '@/types/tasks';
import { useState } from 'react';

export function useChecklistManager(initialItems: ChecklistItem[]) {
    const [checklist, setChecklist] = useState<ChecklistItem[]>(initialItems);

    const toggleItem = (index: number) => {
        setChecklist(prev =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, completed: !item.completed }
                    : item
            )
        );
    };

    const isCompleted = () => checklist.every(item => item.completed);

    return {
        checklist,
        toggleItem,
        isCompleted,
    };
}
