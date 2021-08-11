import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api"; 

interface ValueInterface {
    value: number;
    title: string;
    description: string;
}

interface GeneralOrientation {
    _id: string;
    which_is: string;
    what_is_it_for: string;
    average_time: string;
    values: ValueInterface[];
}

type GeneralOrientationInput = Omit<GeneralOrientation, '_id'>; 

interface GeneralOrientationsProviderProps {
    children: ReactNode;
}

interface GeneralOrientationContextData {
    generalOrientations: GeneralOrientation[];
    createGeneralOrientation: (generalOrientation: GeneralOrientationInput) => Promise<void>;
    updateGeneralOrientation: (id: String, generalOrientation: GeneralOrientationInput) => Promise<void>;
    deleteGeneralOrientation: (id: String) => Promise<void>;
} 

const GeneralOrientationContext = createContext<GeneralOrientationContextData>(
    {} as GeneralOrientationContextData
);

export function GeneralOrientationProvider({ children }: GeneralOrientationsProviderProps) {
    const [generalOrientations, setGeneralOrientations] = useState<GeneralOrientation[]>([]);

    const uri = '/general_orientations';

    useEffect(()=> {
        api.get<GeneralOrientation[]>(uri)
        .then(response => setGeneralOrientations(response.data));
    }, []);

    async function createGeneralOrientation(generalOrientationInput: GeneralOrientationInput) {
        const response = await api.post(uri, {
            ...generalOrientationInput
        });
    
        const general_orientation = response.data;

        console.log(general_orientation);

        setGeneralOrientations([
            ...generalOrientations,
            general_orientation
        ]);
        console.log(general_orientation);
    }

    async function updateGeneralOrientation(id: string, generalOrientationInput: GeneralOrientationInput) {
        const response = await api.patch(uri + '/' + id, {
            ...generalOrientationInput
        });

        api.get<GeneralOrientation[]>(uri)
        .then(response => setGeneralOrientations(response.data));
    };

    async function deleteGeneralOrientation(id:string) {
        const response = await api.delete(uri + '/' + id);

        const index = generalOrientations.findIndex(item => item._id == id);
        generalOrientations.splice(index, 1);

        setGeneralOrientations([
            ...generalOrientations
        ]);
    };

    return (
        <GeneralOrientationContext.Provider value={{generalOrientations, createGeneralOrientation, updateGeneralOrientation, deleteGeneralOrientation}}>
            { children }
        </GeneralOrientationContext.Provider>
    );
}

export function useGeneralOrientations() {
    const context = useContext(GeneralOrientationContext);

    return context;
}