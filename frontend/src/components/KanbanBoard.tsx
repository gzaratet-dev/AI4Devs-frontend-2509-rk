import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import CandidateCard from './CandidateCard';
import { updateCandidateStage } from '../services/candidateService';

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

type KanbanBoardProps = {
    interviewSteps: InterviewStep[];
    candidates: Candidate[];
    onCandidatesUpdate?: (updatedCandidates: Candidate[]) => void;
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ interviewSteps, candidates, onCandidatesUpdate }) => {
    const [localCandidates, setLocalCandidates] = useState<Candidate[]>(candidates);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    // Sincronizar candidatos locales cuando cambian los props
    React.useEffect(() => {
        setLocalCandidates(candidates);
    }, [candidates]);

    // Ordenar los pasos por orderIndex
    const sortedSteps = [...interviewSteps].sort((a, b) => a.orderIndex - b.orderIndex);

    // Crear mapa de nombres de steps a IDs
    const stepNameToIdMap = new Map<string, number>();
    sortedSteps.forEach(step => {
        stepNameToIdMap.set(step.name, step.id);
    });

    // Función para obtener candidatos de una fase específica
    const getCandidatesForStep = (stepName: string): Candidate[] => {
        return localCandidates.filter(candidate => candidate.currentInterviewStep === stepName);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        // Extraer datos del candidato arrastrado
        const candidateData = active.data.current;
        if (!candidateData) return;

        const { candidateId, applicationId, currentInterviewStep: oldStepName } = candidateData;

        // Extraer datos de la columna destino
        const dropData = over.data.current;
        if (!dropData) return;

        const { stepId: newStepId, stepName: newStepName } = dropData;

        // Validar que el movimiento sea a una columna diferente
        if (oldStepName === newStepName) {
            return;
        }

        // Optimistic update: actualizar estado local inmediatamente
        const updatedCandidates = localCandidates.map(candidate => {
            if (candidate.id === candidateId) {
                return {
                    ...candidate,
                    currentInterviewStep: newStepName,
                };
            }
            return candidate;
        });

        setLocalCandidates(updatedCandidates);
        setIsUpdating(true);

        try {
            // Llamar al servicio para actualizar en el backend
            await updateCandidateStage(candidateId, applicationId, newStepId);
            
            // Notificar al componente padre si existe el callback
            if (onCandidatesUpdate) {
                onCandidatesUpdate(updatedCandidates);
            }
        } catch (error) {
            // Rollback en caso de error
            setLocalCandidates(candidates);
            console.error('Error al actualizar la etapa del candidato:', error);
            alert(`Error al mover el candidato: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="mt-4">
                {isUpdating && (
                    <div className="alert alert-info mb-3" role="alert">
                        Actualizando posición del candidato...
                    </div>
                )}
                <Row className="g-3">
                    {sortedSteps.map((step) => {
                        const stepCandidates = getCandidatesForStep(step.name);
                        return (
                            <Col key={step.id} xs={12} sm={6} md={4} lg={3}>
                                <KanbanColumn step={step}>
                                    {stepCandidates.length > 0 ? (
                                        stepCandidates.map((candidate) => (
                                            <CandidateCard
                                                key={candidate.id}
                                                id={candidate.id}
                                                applicationId={candidate.applicationId}
                                                fullName={candidate.fullName}
                                                averageScore={candidate.averageScore}
                                                currentInterviewStep={candidate.currentInterviewStep}
                                            />
                                        ))
                                    ) : null}
                                </KanbanColumn>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </DndContext>
    );
};

export default KanbanBoard;

