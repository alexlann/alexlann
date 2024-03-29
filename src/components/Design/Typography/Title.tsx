const Title = ({ children } : { children: any }) => {
    return (
        <h1 className="whitespace-nowrap font-title font-bold text-black text-7xl md:text-8xl mt-5 mb-4 leading-none">
            { children }
        </h1>
    )
};

export default Title;
