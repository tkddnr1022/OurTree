export interface Class {
    _id: string;
    ALL_TI_YMD: string;
    PERIO: string;
    CLASS_NM: string;
    ITRT_CNTNT: string;
    SD_SCHUL_CODE: string;
    GRADE: string;
    ATPT_OFCDC_SC_CODE: string;
    ATPT_OFCDC_SC_NM: string;
    AY: string;
    CLRM_NM: string;
    DDDEP_NM: string;
    DGHT_CRSE_SC_NM: string;
    LOAD_DTM: string;
    ORD_SC_NM: string;
    SCHUL_NM: string;
    SEM: string;
    __v: number;
}

export interface ClassResponse {
    success: boolean;
    data: Class[];
    error?: string;
}
