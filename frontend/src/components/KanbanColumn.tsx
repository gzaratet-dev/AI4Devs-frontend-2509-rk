import React from 'react';
import { Card } from 'react-bootstrap';

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
    return (
        <div className="mb-3">
            <Card className="h-100 shadow-sm">
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

