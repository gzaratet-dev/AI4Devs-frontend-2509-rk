import axios from 'axios';
import API_URL from '../config/api';

export const uploadCV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Devuelve la ruta del archivo y el tipo
    } catch (error) {
        throw new Error('Error al subir el archivo:', error.response.data);
    }
};

export const sendCandidateData = async (candidateData) => {
    try {
        const response = await axios.post(`${API_URL}/candidates`, candidateData);
        return response.data;
    } catch (error) {
        throw new Error('Error al enviar datos del candidato:', error.response.data);
    }
};

/**
 * Actualiza la etapa del candidato en el proceso de entrevistas
 * @param {number} candidateId - ID del candidato
 * @param {number} applicationId - ID de la aplicación
 * @param {number} currentInterviewStep - ID del nuevo paso de entrevista
 * @returns {Promise<Object>} Respuesta del servidor con los datos actualizados
 */
export const updateCandidateStage = async (candidateId, applicationId, currentInterviewStep) => {
    try {
        const response = await axios.put(`${API_URL}/candidates/${candidateId}`, {
            applicationId,
            currentInterviewStep
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error al actualizar la etapa del candidato: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
};