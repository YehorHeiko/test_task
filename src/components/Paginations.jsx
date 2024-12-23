function Paginations({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", gap: "10px" }} className="pagination">
        <li style={{ listStyleType: "none" }}>
          <a
            style={{ border: "1px solid black", color: "black", textDecoration: "none", cursor: "pointer" }}
            onClick={handlePrevious}
            href="!#"
            className="page-link"
          >
            Назад
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} style={{ listStyleType: "none" }}>
            <a
              style={{ border: "1px solid black", color: "black", textDecoration: "none", cursor: "pointer" }}
              onClick={() => paginate(number)}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
        <li style={{ listStyleType: "none" }}>
          <a
            style={{ border: "1px solid black", color: "black", textDecoration: "none", cursor: "pointer" }}
            onClick={handleNext}
            href="!#"
            className="page-link"
          >
            В перед
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Paginations;