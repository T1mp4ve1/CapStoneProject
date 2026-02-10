function FooterGuitar() {
  return (
    <footer className="mt-5 py-4 bg-dark text-light">
      <div className="container text-center">

        <h5 className="mb-3">Chitart Guitar Shop</h5>

        <p className="mb-1">
          Strumenti artigianali, qualità professionale, passione autentica.
        </p>

        <div className="d-flex justify-content-center gap-3 fs-4 mt-3">
          <a href="#" className="text-light">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="text-light">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" className="text-light">
            <i className="bi bi-envelope-fill"></i>
          </a>
        </div>

        <hr className="border-secondary my-3" />

        <p className="small text-secondary mb-0">
          © {new Date().getFullYear()} Chitart — Tutti i diritti riservati
        </p>
      </div>
    </footer>
  );
}

export default FooterGuitar;