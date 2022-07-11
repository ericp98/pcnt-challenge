const Container = ({ children }) => {
    return (
        <div className="flex flex-col font-['Helvetica'] items-center pt-4 bg-primary min-h-screen">
            <div className='flex flex-col'>
                {children}
            </div>
        </div>
    )
}

export default Container