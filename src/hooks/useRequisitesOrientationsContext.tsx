import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api"; 
import { RequisiteOrientation } from "../interfaces/requisiteOrientation.interface";

type RequisiteOrientationInput = Omit<RequisiteOrientation, '_id'>; 

interface RequisiteOrientationsProviderProps {
    children: ReactNode;
}

interface RequisiteOrientationContextData {
    requisiteOrientations: RequisiteOrientation[];
    createRequisiteOrientation: (requisiteOrientation: RequisiteOrientationInput) => Promise<void>;
    updateRequisiteOrientation: (id: String, requisiteOrientation: RequisiteOrientationInput) => Promise<void>;
    deleteRequisiteOrientation: (id: String) => Promise<void>;
} 

const RequisiteOrientationContext = createContext<RequisiteOrientationContextData>(
    {} as RequisiteOrientationContextData
);

export function RequisiteOrientationProvider({ children }: RequisiteOrientationsProviderProps) {
    const [requisiteOrientations, setRequisiteOrientations] = useState<RequisiteOrientation[]>([]);

    const uri = '/requisites_orientations';

    useEffect(()=> {
        api.get<RequisiteOrientation[]>(uri)
        .then(response => setRequisiteOrientations(response.data));
    }, []);

    async function createRequisiteOrientation(requisiteOrientationInput: RequisiteOrientationInput) {
        console.log(requisiteOrientationInput);
        
        // const response = await api.post(uri, {
        //     ...requisiteOrientationInput
        // });
    
        // const requisite_orientation = response.data;

        // setRequisiteOrientations([
        //     ...requisiteOrientations,
        //     requisite_orientation
        // ]);
    }

    async function updateRequisiteOrientation(id: string, requisiteOrientationInput: RequisiteOrientationInput) {
        const response = await api.patch(uri + '/' + id, {
            ...requisiteOrientationInput
        });

        api.get<RequisiteOrientation[]>(uri)
        .then(response => setRequisiteOrientations(response.data));
    };

    async function deleteRequisiteOrientation(id:string) {
        const response = await api.delete(uri + '/' + id);

        const index = requisiteOrientations.findIndex(item => item._id == id);
        requisiteOrientations.splice(index, 1);

        setRequisiteOrientations([
            ...requisiteOrientations
        ]);
    };

    return (
        <RequisiteOrientationContext.Provider value={{requisiteOrientations, createRequisiteOrientation, updateRequisiteOrientation, deleteRequisiteOrientation}}>
            { children }
        </RequisiteOrientationContext.Provider>
    );
}

export function useRequisiteOrientations() {
    const context = useContext(RequisiteOrientationContext);

    return context;
}