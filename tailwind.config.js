/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-action": "#FA4848",
                "secondary-action": "#00FF94",
                "primary-bg": "#FFFFFF14",
                "primary-bg-no-alpha": "#141414",
                trophy: "#F9F871",
            },
            boxShadow: {
                primary: "0px 0px 12px 0px #FA484899",
                secondary: "0px 0px 12px 0px #00FF9499",
            },
            dropShadow: {
                gold: "0px 0px 14px rgba(249, 248, 113, 0.75)",
                silver: "0px 0px 14px rgba(188, 188, 188, 0.75)",
                bronze: "0px 0px 14px rgba(205, 127, 50, 0.75)",
                primary: "0px 0px 14px rgba(250, 72, 72, 1)",
                secondary: "0px 0px 20px rgba(0, 255, 148, 1)",
            },
        },
    },
    plugins: [],
};
