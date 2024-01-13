

export interface GroupSaveRequest {
  name: string;
  supervisorId: number;
}

export interface GroupSnapshot {
  id: number;
  name: string;
  supervisorId: number;
  supervisorFirstName: string;
  supervisorLastName: string;
}
