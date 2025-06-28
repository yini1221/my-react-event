import '../css/footer.css';

function Footer() {
  return (
    <footer
      className="text-center py-3 mt-auto shadow-sm bg-footer"
      style={{
        color: "#7A4E2E",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        fontWeight: "600",
        fontSize: "0.9rem",
        boxShadow: "0 -2px 6px rgba(122, 78, 46, 0.15)",
      }}
    >
      
      <a href="mailto:cyini1221@gmail.com" className='text-color'>聯絡信箱：cyini1221@gmail.com</a>
    </footer>
  );
}

export default Footer;
