const Item = ({ link, content }) => {
    return (
        <li>
            <a href={link}>{content}</a>
        </li>
    );
};

export default Item;
