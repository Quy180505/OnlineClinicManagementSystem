import { useState } from "react";

export default function PatientSearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch({
      keyword: keyword.trim(),
    });
  };

  const handleReset = () => {
    setKeyword("");

    onSearch({
      keyword: "",
    });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">
            <div className="col-md-9">
              <label htmlFor="keyword" className="form-label">
                Tìm kiếm bệnh nhân
              </label>

              <input
                id="keyword"
                type="text"
                name="keyword"
                value={keyword}
                onChange={handleChange}
                className="form-control"
                placeholder="Nhập họ tên, số điện thoại hoặc căn cước công dân..."
              />
            </div>

            <div className="col-md-3">
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary flex-grow-1">
                  Tìm kiếm
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
