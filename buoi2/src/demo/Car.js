import React, { useState } from 'react';

function Car() {
    // Khởi tạo state với thông tin xe
    const [car, setCar] = useState({
        brand: "Sirius",
        model: "Sirius Model",
        year: "2011",
        color: "Xám Đen Limited Edition"
    });

    // Hàm cập nhật màu cho xe
    const updateColor = () => {
        setCar((previousState) => {
            return { ...previousState, color: "Xám Xi Măng Limited Edition" };
        });
    };

    return (
        <>
            <h1>Hiển Thị Thông Tin Xe:</h1>
            <h2>Thương Hiệu: {car.brand}</h2>
            <p>
                Màu: {car.color}, Model: {car.model}, Năm: {car.year}.
            </p>
            <button type="button" onClick={updateColor}>Cập nhật màu xe: Xám Xi Măng</button>
        </>
    );
}

export default Car;
