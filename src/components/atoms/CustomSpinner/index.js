function CustomSpinner({className}) {
    className = className ? className : '';
    return (
        <span className={`spinner-border spinner-border-sm ${className}custom-spinner`}></span>
    );
}

export default CustomSpinner;