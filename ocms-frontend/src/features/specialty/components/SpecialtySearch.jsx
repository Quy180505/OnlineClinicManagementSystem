export default function SpecialtySearch({ keyword, onKeywordChange }) {
  return (
    <div className="mb-3">
      <label htmlFor="specialtyKeyword" className="form-label">
        Tìm kiếm chuyên khoa
      </label>

      <div className="input-group">
        <span className="input-group-text">🔍</span>

        <input
          id="specialtyKeyword"
          type="search"
          className="form-control"
          placeholder="Nhập tên chuyên khoa..."
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
        />
      </div>
    </div>
  );
}
