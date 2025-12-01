import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type PositionHeaderProps = {
    positionName: string;
};

const PositionHeader: React.FC<PositionHeaderProps> = ({ positionName }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/positions');
    };

    return (
        <Container className="mt-4 mb-4">
            <div className="d-flex align-items-center">
                <Button
                    variant="link"
                    onClick={handleBack}
                    className="p-0 me-3"
                    style={{ border: 'none', background: 'none', textDecoration: 'none' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                        />
                    </svg>
                </Button>
                <h2 className="mb-0">{positionName}</h2>
            </div>
        </Container>
    );
};

export default PositionHeader;

