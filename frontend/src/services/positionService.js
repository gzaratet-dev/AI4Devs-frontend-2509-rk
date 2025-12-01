import axios from 'axios';
import API_URL from '../config/api';

/**
 * Obtiene el flujo de entrevistas para una posición específica
 * @param {number} positionId - ID de la posición
 * @returns {Promise<Object>} Objeto con positionName e interviewFlow
 */
export const getInterviewFlowByPosition = async (positionId) => {
    try {
        const response = await axios.get(`${API_URL}/position/${positionId}/interviewflow`);
        // La respuesta está envuelta en { interviewFlow: {...} }
        const { interviewFlow } = response.data;
        return interviewFlow;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error al obtener el flujo de entrevistas: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
};

/**
 * Obtiene todos los candidatos para una posición específica
 * @param {number} positionId - ID de la posición
 * @returns {Promise<Array>} Array de candidatos con fullName, currentInterviewStep, averageScore, id, applicationId
 */
export const getCandidatesByPosition = async (positionId) => {
    try {
        const response = await axios.get(`${API_URL}/position/${positionId}/candidates`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error al obtener los candidatos: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
};

