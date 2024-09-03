export function formatScheduleDate(date: string) {
    // 예외 처리
    if (date.length !== 8) {
        throw new Error("Invalid date string format. Expected YYYYMMDD.");
    }

    const year = date.substring(0, 4); // YYYY
    const month = date.substring(4, 6); // MM
    const day = date.substring(6, 8); // DD

    const monthNumber = parseInt(month, 10);
    const dayNumber = parseInt(day, 10);

    return `${monthNumber}월 ${dayNumber}일`;
}

export function formatMealName(name: string): string {
    const dishes = name.split('<br/>');
    const cleanedDishes = dishes.map(dish => dish.split('(')[0].trim());
    return cleanedDishes.join(', ');
}