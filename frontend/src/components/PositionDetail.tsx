import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PositionHeader from './PositionHeader';
import KanbanBoard from './KanbanBoard';

// Mock data para la Fase 2
const mockPositionData = {
    positionName: 'Senior Backend Engineer',
    interviewSteps: [
        {
            id: 1,
            interviewFlowId: 1,
            interviewTypeId: 1,
            name: 'Initial Screening',
            orderIndex: 1
        },
        {
            id: 2,
            interviewFlowId: 1,
            interviewTypeId: 2,
            name: 'Technical Interview',
            orderIndex: 2
        },
        {
            id: 3,
            interviewFlowId: 1,
            interviewTypeId: 3,
            name: 'Manager Interview',
            orderIndex: 3
        },
        {
            id: 4,
            interviewFlowId: 1,
            interviewTypeId: 4,
            name: 'Final Review',
            orderIndex: 4
        }
    ]
};

const PositionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // En fases posteriores, aquí se cargarán los datos reales o mockeados
    // Por ahora usamos datos mockeados
    const positionName = mockPositionData.positionName;
    const interviewSteps = mockPositionData.interviewSteps;

    return (
        <Container>
            <PositionHeader positionName={positionName} />
            <KanbanBoard interviewSteps={interviewSteps} />
        </Container>
    );
};

export default PositionDetail;

