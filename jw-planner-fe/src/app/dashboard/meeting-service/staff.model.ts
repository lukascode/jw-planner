
export interface Week {
  week?: string;
  dateFrom: string;
  dateTo: string;
}

export interface WeekDto {
  week?: string;
  dateFrom: string;
  dateTo: string;
  avMixer: string;
  avMicrophone: string;
  avStageMicrophone: string;
  keeper: string;
  zoomKeeper: string;
  hallKeeper: string;
  cleaning: string;
  parking: string;
}

export interface MeetingStaffSaveRequest {
  month: string;
  weeks: WeekDto[];
}

export interface MeetingStaffSnapshot {
  id: number;
  month: string;
  weeks: WeekDto[];
}

