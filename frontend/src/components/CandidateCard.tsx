import React from 'react';
import { Card } from 'react-bootstrap';

type CandidateCardProps = {
    fullName: string;
    averageScore: number;
};

const CandidateCard: React.FC<CandidateCardProps> = ({ fullName, averageScore }) => {
    // Función para obtener el color del badge según la puntuación
    const getScoreColor = (score: number) => {
        if (score >= 4) return 'bg-success';
        if (score >= 2) return 'bg-warning';
        return 'bg-danger';
    };

    // Formatear la puntuación para mostrar
    const formattedScore = averageScore > 0 ? averageScore.toFixed(1) : '0.0';

    return (
        <Card className="mb-2 shadow-sm" style={{ cursor: 'pointer' }}>
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
    );
};

export default CandidateCard;

