import RevenueOverviewChart from "./RevenueOverviewChart";
import RevenueSpecialtyChart from "./RevenueSpecialtyChart";

function RevenueReportSection({monthlyRevenue,quarterlyRevenue,revenueBySpecialty,revenueView,quarter,onChangeView,onChangeQuarter}) {
  return (
    <section className="mb-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <h5 className="mb-0">Báo cáo doanh thu</h5>

            <div className="btn-group">
              <button
                type="button"
                className={`btn ${revenueView === "monthly" ? "btn-primary": "btn-outline-primary"}`}
                onClick={() => onChangeView("monthly")}
              >
                Theo tháng
              </button>

              <button
                type="button"
                className={`btn ${ revenueView === "quarterly" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => onChangeView("quarterly")}
              >
                Theo quý
              </button>
            </div>
          </div>

          <h6 className="mb-3">
            {revenueView === "monthly" ? "Doanh thu theo tháng": "Doanh thu theo quý"}
          </h6>

          <RevenueOverviewChart
            monthlyRevenue={monthlyRevenue}
            quarterlyRevenue={quarterlyRevenue}
            view={revenueView}
          />

          <hr className="my-4" />

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <h6 className="mb-0">
              Doanh thu theo chuyên khoa
            </h6>

            <select
              className="form-select"
              value={quarter ?? ""}
              onChange={(e) => onChangeQuarter(e.target.value)}
              style={{ width: "150px" }}
            >
              <option value="">Tất cả các quý</option>
              <option value="1">Quý 1</option>
              <option value="2">Quý 2</option>
              <option value="3">Quý 3</option>
              <option value="4">Quý 4</option>
            </select>
          </div>

          {revenueBySpecialty.length > 0 ? (
            <RevenueSpecialtyChart
              data={revenueBySpecialty}
            />
          ) : (
            <div className="text-center text-muted py-5">
              Không có dữ liệu doanh thu theo chuyên khoa.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RevenueReportSection;