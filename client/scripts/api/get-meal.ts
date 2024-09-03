import { MealResponse } from "@/interfaces/meal";
import axios from "axios";

export default async function getMeal(school_code: string, date: string) {
    try {
        const response = await axios.get<MealResponse>("http://192.168.0.14:3000/meal", { params: { school_code: school_code, date: date } });
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