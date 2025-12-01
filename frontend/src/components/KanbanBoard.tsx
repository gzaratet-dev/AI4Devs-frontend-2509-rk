import React from 'react';
import { Row, Col } from 'react-bootstrap';
import KanbanColumn from './KanbanColumn';
import CandidateCard from './CandidateCard';

type InterviewStep = {
    id: number;
    interviewFlowId: number;
    interviewTypeId: number;
    name: string;
    orderIndex: number;
};

type Candidate = {
    fullName: string;
    currentInterviewStep: string;
    averageScore: number;
    id?: number;
    applicationId?: number;
};

type KanbanBoardProps = {
    interviewSteps: InterviewStep[];
    candidates: Candidate[];
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ interviewSteps, candidates }) => {
    // Ordenar los pasos por orderIndex
    const sortedSteps = [...interviewSteps].sort((a, b) => a.orderIndex - b.orderIndex);

    // Función para obtener candidatos de una fase específica
    const getCandidatesForStep = (stepName: string): Candidate[] => {
        return candidates.filter(candidate => candidate.currentInterviewStep === stepName);
    };

    return (
        <div className="mt-4">
            <Row className="g-3">
                {sortedSteps.map((step) => {
                    const stepCandidates = getCandidatesForStep(step.name);
                    return (
                        <Col key={step.id} xs={12} sm={6} md={4} lg={3}>
                            <KanbanColumn step={step}>
                                {stepCandidates.length > 0 ? (
                                    stepCandidates.map((candidate, index) => (
                                        <CandidateCard
                                            key={candidate.id || index}
                                            fullName={candidate.fullName}
                                            averageScore={candidate.averageScore}
                                        />
                                    ))
                                ) : null}
                            </KanbanColumn>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default KanbanBoard;

