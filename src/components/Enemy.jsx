import React from "react";

const Enemy = ({ position }) => {
    return (
    <div
    className = "enemy"
    style = {{
        left: `${position.x}px`,
        bottom: `${position.y}px`
    }}
        >

<div className="enemy-box"></div>

</div>
    );
};





export default Enemy;
