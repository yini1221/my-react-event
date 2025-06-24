import '../css/footer.css';

function Footer() {
  return (
    <footer
      className="text-center py-3 mt-auto shadow-sm bg-footer text-color"
      style={{
        color: "#7A4E2E",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        fontWeight: "600",
        fontSize: "0.9rem",
        boxShadow: "0 -2px 6px rgba(122, 78, 46, 0.15)",
      }}
    >
      聯絡信箱：
      <a href="mailto:example@email.com" className='text-color'>yini1221@gmail.com</a>
    </footer>
  );
}

export default Footer;
