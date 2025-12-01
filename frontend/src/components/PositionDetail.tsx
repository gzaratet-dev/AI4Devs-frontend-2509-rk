import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PositionHeader from './PositionHeader';
import KanbanBoard from './KanbanBoard';
import { getInterviewFlowByPosition, getCandidatesByPosition } from '../services/positionService';

type InterviewStep = {
    id: number;
    interviewFlowId: number;
    interviewTypeId: number;
    name: string;
    orderIndex: number;
};

type Candidate = {
    id: number;
    applicationId: number;
    fullName: string;
    currentInterviewStep: string;
    averageScore: number;
};

type InterviewFlowData = {
    positionName: string;
    interviewFlow: {
        id: number;
        description: string;
        interviewSteps: InterviewStep[];
    };
};

const PositionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [positionName, setPositionName] = useState<string>('');
    const [interviewSteps, setInterviewSteps] = useState<InterviewStep[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPositionData = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                const positionId = parseInt(id, 10);
                
                // Cargar datos en paralelo
                const [interviewFlowData, candidatesData] = await Promise.all([
                    getInterviewFlowByPosition(positionId),
                    getCandidatesByPosition(positionId)
                ]);

                // Añadir tipos explícitos para TypeScript
                const typedInterviewFlowData = interviewFlowData as InterviewFlowData;
                const typedCandidatesData = candidatesData as Candidate[];

                setPositionName(typedInterviewFlowData.positionName);
                setInterviewSteps(typedInterviewFlowData.interviewFlow.interviewSteps);
                setCandidates(typedCandidatesData);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar los datos';
                setError(errorMessage);
                console.error('Error loading position data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadPositionData();
    }, [id]);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                    <Spinner animation="border" role="status" className="mb-3">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                    <p>Cargando datos de la posición...</p>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert variant="danger" className="mt-4">
                    <Alert.Heading>Error al cargar los datos</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }

    const handleCandidatesUpdate = (updatedCandidates: Candidate[]) => {
        setCandidates(updatedCandidates);
    };

    return (
        <Container>
            <PositionHeader positionName={positionName} />
            <KanbanBoard 
                interviewSteps={interviewSteps} 
                candidates={candidates}
                onCandidatesUpdate={handleCandidatesUpdate}
            />
        </Container>
    );
};

export default PositionDetail;

