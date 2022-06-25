const Ranking = () => {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-white text-6xl">Ranking</h1>
            <div className="flex justify-between">
                <button className="rounded-md text-white bg-neutral-700 p-3">
                    Single
                </button>
                <button className="rounded-md text-white bg-neutral-700 p-3">
                    Sort by
                </button>
            </div>
        </div>
    );
};

export default Ranking;
