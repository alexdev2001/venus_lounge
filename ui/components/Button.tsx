interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors"
        >
            {children}
        </button>
    );
};