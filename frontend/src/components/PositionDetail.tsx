import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PositionHeader from './PositionHeader';
import KanbanBoard from './KanbanBoard';

// Mock data para la Fase 3
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
    ],
    candidates: [
        {
            id: 1,
            applicationId: 1,
            fullName: 'Jane Smith',
            currentInterviewStep: 'Technical Interview',
            averageScore: 4.5
        },
        {
            id: 2,
            applicationId: 2,
            fullName: 'Carlos García',
            currentInterviewStep: 'Initial Screening',
            averageScore: 0
        },
        {
            id: 3,
            applicationId: 3,
            fullName: 'John Doe',
            currentInterviewStep: 'Manager Interview',
            averageScore: 5.0
        },
        {
            id: 4,
            applicationId: 4,
            fullName: 'Maria Rodriguez',
            currentInterviewStep: 'Initial Screening',
            averageScore: 3.2
        },
        {
            id: 5,
            applicationId: 5,
            fullName: 'David Chen',
            currentInterviewStep: 'Technical Interview',
            averageScore: 4.0
        },
        {
            id: 6,
            applicationId: 6,
            fullName: 'Sarah Johnson',
            currentInterviewStep: 'Final Review',
            averageScore: 4.8
        },
        {
            id: 7,
            applicationId: 7,
            fullName: 'Michael Brown',
            currentInterviewStep: 'Technical Interview',
            averageScore: 2.5
        }
    ]
};

const PositionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // En fases posteriores, aquí se cargarán los datos reales desde la API
    // Por ahora usamos datos mockeados
    const positionName = mockPositionData.positionName;
    const interviewSteps = mockPositionData.interviewSteps;
    const candidates = mockPositionData.candidates;

    return (
        <Container>
            <PositionHeader positionName={positionName} />
            <KanbanBoard interviewSteps={interviewSteps} candidates={candidates} />
        </Container>
    );
};

export default PositionDetail;

