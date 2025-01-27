alter table jw_meeting_staff_week drop column parking1;
alter table jw_meeting_staff_week drop column parking2;
alter table jw_meeting_staff_week add column parking varchar(255) NULL;