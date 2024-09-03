import { SchoolResponse } from "@/interfaces/school";
import axios from "axios";

export default async function getSchool(school_code: string) {
    try {
        const response = await axios.get<SchoolResponse>("http://192.168.0.14:3000/school", { params: { school_code: school_code } });
        const data = response.data;
        if (data.success) {
            return data.data;
        }
        else {
            throw Error(data.error);
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}