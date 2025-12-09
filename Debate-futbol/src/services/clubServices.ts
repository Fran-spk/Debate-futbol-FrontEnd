
import clubesData from '../data/teams.json';

export interface team {
    id: number; // Usaremos el índice como ID temporal
    team: string;
}

export const getClubs = async (): Promise<team[]> => {
    await new Promise(resolve => setTimeout(resolve, 50)); 
    
    const formattedClubs: team[] = clubesData.map((teamName, index) => ({
        id: index + 1, 
        team: teamName,
    }));
    
    return formattedClubs;
};