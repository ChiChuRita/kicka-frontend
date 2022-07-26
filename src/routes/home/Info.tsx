import React from "react";

const Info = () => {
    return (
        <div className="flex items-center bg-primary-bg rounded-md">
            <div className="p-8 text-2xl">💡</div>
            <div className="py-8 pr-8">
                <p>
                    To compete against other players, select "Create Game"!
                    After the game, you can see your and others' achievements in
                    the Rankings page, located at the bottom left of the screen.
                </p>
                <br />
                <p>Go ahead and create your first game!</p>
            </div>
        </div>
    );
};

export default Info;
