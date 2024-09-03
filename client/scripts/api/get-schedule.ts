import { ScheduleResponse } from "@/interfaces/schedule";
import axios from "axios";

export default async function getSchedule(school_code: string, ym: string) {
    // Todo: 현재 날짜 기준으로 다음 3개 일정만 가져오기
    // Todo: DB 구조 개선하기
    try {
        const response = await axios.get<ScheduleResponse>("http://192.168.0.14:3000/schedule", { params: { school_code: school_code, ym: ym } });
        const data = response.data;
        if (data.success) {
            return data.data.row.slice(0, 3); // 임시로 slice
        }
        else {
            throw Error(data.error);
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}