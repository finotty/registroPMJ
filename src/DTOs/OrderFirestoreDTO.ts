//data transfer object
import { Timestamp } from "firebase/firestore";

export type OrderFirestoreDTO = {
    secretaria : string;
    problema: string;
    solucao?: string | any;
    tecnico:string;
    created_at: Timestamp;
    closed_at?: Timestamp | any;
    
}