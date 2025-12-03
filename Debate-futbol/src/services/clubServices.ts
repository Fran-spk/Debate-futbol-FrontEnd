// src/services/clubServices.ts

// 1. Importación directa del JSON local
import clubesData from '../data/teams.json';

// 2. Definición del tipo que coincide con el mapeo de tu componente
// IMPORTANTE: Tu componente mapea c.id y c.club, pero tu JSON es un array de strings.
// Debemos adaptar la estructura que devuelve el servicio para que coincida con lo que espera el select.
export interface team {
    id: number; // Usaremos el índice como ID temporal
    team: string;
}

/**
 * Función para obtener la lista de clubes desde el archivo JSON local.
 * Adapta el array de strings a un array de objetos { id, club }.
 */
export const getClubs = async (): Promise<team[]> => {
    // Simulamos una mínima latencia para no bloquear la UI si fuera muy rápido
    await new Promise(resolve => setTimeout(resolve, 50)); 
    
    // Mapeamos el array de strings a la estructura { id: index, club: nombre }
    const formattedClubs: team[] = clubesData.map((teamName, index) => ({
        id: index + 1, // Usamos 1-based index como ID
        team: teamName,
    }));
    
    return formattedClubs;
};