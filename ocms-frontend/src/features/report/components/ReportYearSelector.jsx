function ReportYearSelector({ year, onChange }) {
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: 6 },
    (_, index) => currentYear - index,
  );

  return (
    <div className="d-flex align-items-center gap-2">
      <label htmlFor="reportYear" className="fw-semibold mb-0">
        Năm báo cáo
      </label>

      <select
        id="reportYear"
        className="form-select"
        value={year}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "140px" }}
      >
        {years.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ReportYearSelector;