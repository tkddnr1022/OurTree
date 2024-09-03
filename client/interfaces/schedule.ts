export interface Schedule {
    ATPT_OFCDC_SC_CODE: string;
    SD_SCHUL_CODE: string;
    AY: string;
    AA_YMD: string;
    ATPT_OFCDC_SC_NM: string;
    SCHUL_NM: string;
    DGHT_CRSE_SC_NM: string;
    SCHUL_CRSE_SC_NM: string;
    EVENT_NM: string;
    EVENT_CNTNT: string;
    ONE_GRADE_EVENT_YN: string;
    TW_GRADE_EVENT_YN: string;
    THREE_GRADE_EVENT_YN: string;
    FR_GRADE_EVENT_YN: string;
    FIV_GRADE_EVENT_YN: string;
    SIX_GRADE_EVENT_YN: string;
    SBTR_DD_SC_NM: string;
    LOAD_DTM: string;
    _id: string;
}

export interface ScheduleResponse {
    success: boolean;
    data: {
        _id: string;
        SD_SCHUL_CODE: string;
        YEARMONTH: string;
        __v: number;
        row: Schedule[];
    };
    error?: string;
}
