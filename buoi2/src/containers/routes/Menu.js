import Item from './Item';

const Menu = () => {
    const list = [
        { link: "#home", content: "Home" },
        { link: "#about", content: "About" },
        { link: "#services", content: "Services" },
        { link: "#contact", content: "Contact" },
    ];

    return (
        <ul>
            {list.map((item, index) => (
                <Item key={index} link={item.link} content={item.content} />
            ))}
        </ul>
    );
};

export default Menu;
