
const DateTime = () => {
    const lastDate = new Date().toLocaleString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return <span>{lastDate}</span>;
}
    export default DateTime;