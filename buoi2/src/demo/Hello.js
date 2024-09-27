import React from 'react';

function Hello() {
    // Function hiển thị thông báo khi bấm nút
    const hiAll = () => {
        alert("Hello everyone");
    };

    const hiYou = (name) => {
        alert("Hello " + name);
    };

    return (
        <span>
            <button onClick={hiAll}>Hi All</button>
            <button onClick={() => hiYou("Khanh")}>Hi you</button>
        </span>
    );
}

export default Hello;
