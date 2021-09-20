module.exports = {
    purge: ["./resources/**/*.vue"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "app-red": "#C10708",
                "app-gray": "#A4A4A4"
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
