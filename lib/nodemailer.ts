export const sendForm = async (data: {
    [key: string]: string;
}) => fetch('api/contact', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
}).then((res) => {
    if (!res.ok) throw new Error("Failed to submit message");
    return res.json();
});