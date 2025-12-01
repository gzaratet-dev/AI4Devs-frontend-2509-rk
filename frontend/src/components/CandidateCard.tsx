import React from 'react';
import { Card } from 'react-bootstrap';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

type CandidateCardProps = {
    id: number;
    applicationId: number;
    fullName: string;
    averageScore: number;
    currentInterviewStep: string;
};

const CandidateCard: React.FC<CandidateCardProps> = ({ 
    id, 
    applicationId, 
    fullName, 
    averageScore,
    currentInterviewStep 
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useDraggable({
        id: `candidate-${id}`,
        data: {
            candidateId: id,
            applicationId,
            currentInterviewStep,
            fullName,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };

    // Función para obtener el color del badge según la puntuación
    const getScoreColor = (score: number) => {
        if (score >= 4) return 'bg-success';
        if (score >= 2) return 'bg-warning';
        return 'bg-danger';
    };

    // Formatear la puntuación para mostrar
    const formattedScore = averageScore > 0 ? averageScore.toFixed(1) : '0.0';

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Card className="mb-2 shadow-sm" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="flex-grow-1">
                            <h6 className="mb-1">{fullName}</h6>
                        </div>
                        <span className={`badge ${getScoreColor(averageScore)} text-white ms-2`}>
                            {formattedScore}
                        </span>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CandidateCard;

