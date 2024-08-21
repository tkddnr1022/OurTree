export default function formatYMD(date: Date) {
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\./g, '').replace(/ /g, '');
}