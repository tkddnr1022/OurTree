export interface Meal {
    _id: string;
    MLSV_YMD: string;
    MMEAL_SC_CODE: string;
    SD_SCHUL_CODE: string;
    ATPT_OFCDC_SC_CODE: string;
    ATPT_OFCDC_SC_NM: string;
    CAL_INFO: string;
    DDISH_NM: string;
    LOAD_DTM: string;
    MLSV_FGR: number;
    MLSV_FROM_YMD: string;
    MLSV_TO_YMD: string;
    MMEAL_SC_NM: string;
    NTR_INFO: string;
    ORPLC_INFO: string;
    SCHUL_NM: string;
    __v: number;
}

export interface MealResponse {
    success: boolean;
    data: Meal[];
    error?: string;
}
