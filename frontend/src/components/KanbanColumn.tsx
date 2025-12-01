import React from 'react';
import { Card } from 'react-bootstrap';
import { useDroppable } from '@dnd-kit/core';

type InterviewStep = {
    id: number;
    name: string;
    orderIndex: number;
};

type KanbanColumnProps = {
    step: InterviewStep;
    children?: React.ReactNode;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ step, children }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `step-${step.id}`,
        data: {
            stepId: step.id,
            stepName: step.name,
        },
    });

    return (
        <div className="mb-3" ref={setNodeRef}>
            <Card 
                className={`h-100 shadow-sm ${isOver ? 'border-primary border-3' : ''}`}
                style={{ 
                    backgroundColor: isOver ? 'rgba(13, 110, 253, 0.1)' : undefined,
                    transition: 'background-color 0.2s ease'
                }}
            >
                <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">{step.name}</h5>
                </Card.Header>
                <Card.Body className="p-3" style={{ minHeight: '200px' }}>
                    {children || (
                        <div className="text-muted text-center">
                            <small>No hay candidatos en esta fase</small>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default KanbanColumn;

