import React from 'react';
import { Row, Col } from 'react-bootstrap';
import KanbanColumn from './KanbanColumn';

type InterviewStep = {
    id: number;
    interviewFlowId: number;
    interviewTypeId: number;
    name: string;
    orderIndex: number;
};

type KanbanBoardProps = {
    interviewSteps: InterviewStep[];
    children?: React.ReactNode;
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ interviewSteps, children }) => {
    // Ordenar los pasos por orderIndex
    const sortedSteps = [...interviewSteps].sort((a, b) => a.orderIndex - b.orderIndex);

    return (
        <div className="mt-4">
            <Row className="g-3">
                {sortedSteps.map((step) => (
                    <Col key={step.id} xs={12} sm={6} md={4} lg={3}>
                        <KanbanColumn step={step}>
                            {children}
                        </KanbanColumn>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default KanbanBoard;

