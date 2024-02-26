import "../style/main.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__contact">
                    <h3>Contact Us</h3>
                    <p>Email: yonatanzewude@hotmail.com</p>
                    <p>Phone: 0760956294</p>
                    <p>Address: Åsgärdevägen 109 121 31, Stockholm, Sweden</p>
                </div>
                <div className="footer__social">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://www.linkedin.com/in/yonatan-zewude-52a993264/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer__copyright">
                <p>&copy; 2024 Yonatan Zewude. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
