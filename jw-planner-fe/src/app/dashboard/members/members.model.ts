
export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface MemberSaveRequest {
    firstName: string;
    lastName: string;
    gender: Gender;
    external: boolean;
    responsibilities: string[];
    email?: string;
    phoneNumber?: string;
    address?: string;
    additionalInformation?: string;
}

export interface MemberSnapshot {
    id: number;
    firstName: string;
    lastName: string;
    gender: Gender;
    external: boolean;
    email?: string;
    phoneNumber?: string;
    address?: string;
    additionalInformation?: string;
    responsibilities: string[];
}
