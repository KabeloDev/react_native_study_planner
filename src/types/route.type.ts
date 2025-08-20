export type RootTabParamList = {
    SubjectsTab: undefined;
    RemindersTab: undefined;
    DocumentsTab: undefined;
};

export type RootStackParamList = {
    Subjects: undefined;
    SubjectDetails: {subject: any};
    AddSubjects: undefined;
    AddSession: {subject: any};
    UpdateSession: {subject: any};
};