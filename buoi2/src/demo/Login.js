import React, { useState } from 'react';

function Login() {
    // Khởi tạo state cho các giá trị input và checkbox
    const [inputs, setInputs] = useState({});
    const [isCheck, setCheck] = useState(false);

    // Hàm xử lý khi có sự thay đổi trong input
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    // Hàm xử lý checkbox
    const handleChecked = () => {
        setCheck(!isCheck);
    };

    // Hàm xử lý khi nhấn nút Đăng nhập
    const handleSubmit = (event) => {
        event.preventDefault();  
        console.log("Dữ liệu nhập:", inputs); 
        console.log("Is Admin:", isCheck);    
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter your username:
                <input
                    type="text"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleChange}
                />
            </label><br />

            <label>
                Enter your password:
                <input
                    type="password"
                    name="pass"
                    value={inputs.pass || ""}
                    onChange={handleChange}
                />
            </label><br />

            <label>
                <input
                    type="checkbox"
                    checked={isCheck}
                    onChange={handleChecked}
                />
                Is Admin?
            </label><br />

            <button type="submit">Đăng nhập</button>
        </form>
    );
}

export default Login;
