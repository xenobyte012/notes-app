export function FormattedDate(props) {
    return (
        props.date.toLocaleDateString("en-ZA", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        })
    )

} 
export function FormattedTime(props) {
    return (
        props.date.toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        })
    )

} 
