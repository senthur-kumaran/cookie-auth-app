export const zodToFormikValidate = (schema) => (values) => {
    try {
        schema.parse(values);
        return {};
    } catch (e) {
        return (e).errors.reduce((acc, error) => {
            acc[error.path[0]] = error.message;
            return acc;
        }, {});
    }
};
