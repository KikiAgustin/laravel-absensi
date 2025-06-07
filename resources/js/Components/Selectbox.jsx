function Selecbox({ className = "", options, currentValue, ...props }) {
    return (
        <select
            {...props}
            defaultValue={currentValue}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
        >
            {options.map((option, index) => (
                <option value={option.value} key={index}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Selecbox;
