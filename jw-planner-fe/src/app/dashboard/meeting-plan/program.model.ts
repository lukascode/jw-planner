
export interface MeetingProgramWeekTopicDto {
  section: string;
  topic: string;
  assignedPerson: string;
  helper: string;
}


export interface MeetingProgramWeekDto {
  week?: string;
  dateFrom: string;
  dateTo: string;
  topics: MeetingProgramWeekTopicDto[];
  chairman: string;
  sundayChairman: string;
  sundayLector: string;
  sundayLectureTitle: string;
  sundayLecturer: string;
  prayer1: string;
  prayer2: string;

  // only for view
  rows?: number;
  treasureTopics?: MeetingProgramWeekTopicDto[];
  improveTopics?: MeetingProgramWeekTopicDto[];
  livingAsChristianTopics?: MeetingProgramWeekTopicDto[];
}

export interface MeetingProgramSaveRequest {
  month: string;
  weeks: MeetingProgramWeekDto[];
}

export interface MeetingProgramSnapshot {
  id: number;
  month: string;
  status: string;
  weeks: MeetingProgramWeekDto[];
}

export interface LectureDto {
  lectureNumber: number;
  lectureTitle: string;
}
