import { DivisionsInterface } from "../interfaces/divisions.interface";  
import { RequisitesInterface } from "../interfaces/requisites.interface";  

export interface RequisiteOrientation {
    _id: string;
    division_description: string;
    division_by_phase: DivisionsInterface[];
    requisites_description: string;
    requisite_by_phase: RequisitesInterface[];
}