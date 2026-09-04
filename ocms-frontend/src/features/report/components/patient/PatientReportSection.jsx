import PatientAgeChart from "./PatientAgeChart";
import PatientGenderChart from "./PatientGenderChart";
import PatientSpecialtyChart from "./PatientSpecialtyChart";

function PatientReportSection({patientAge,patientGender,patientSpecialty,}) {
  return (
    <section>
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="mb-4">Báo cáo bệnh nhân trong năm</h5>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="border rounded p-3 h-100">
                <h6 className="mb-3">
                  Bệnh nhân theo độ tuổi
                </h6>

                {patientAge.length > 0 ? (
                  <PatientAgeChart data={patientAge} />
                ) : (
                  <div className="text-center text-muted py-5">
                    Không có dữ liệu.
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="border rounded p-3 h-100">
                <h6 className="mb-3">
                  Bệnh nhân theo giới tính
                </h6>

                {patientGender.length > 0 ? (
                  <PatientGenderChart data={patientGender} />
                ) : (
                  <div className="text-center text-muted py-5">
                    Không có dữ liệu.
                  </div>
                )}
              </div>
            </div>

            <div className="col-12">
              <div className="border rounded p-3">
                <h6 className="mb-3">
                  Bệnh nhân theo chuyên khoa
                </h6>

                {patientSpecialty.length > 0 ? (
                  <PatientSpecialtyChart
                    data={patientSpecialty}
                  />
                ) : (
                  <div className="text-center text-muted py-5">
                    Không có dữ liệu.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PatientReportSection;