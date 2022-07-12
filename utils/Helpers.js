export const checkIfEmptyFields = (args) => {
    return args.map(arg => arg !== "").reduce((a, b) => a * b);
}

