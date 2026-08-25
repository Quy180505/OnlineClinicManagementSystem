import PatientProfileForm from "../components/PatientProfileForm";
import PatientAccountForm from "../components/PatientAccountForm";
import usePatientProfile from "../hooks/usePatientProfile";

export default function PatientProfilePage() {
  const { profile, loading, error, retry, updateProfile } = usePatientProfile();

  if (loading) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>

        <button type="button" className="btn btn-primary" onClick={retry}>
          Thử lại
        </button>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="mb-1">Hồ sơ cá nhân</h2>

        <p className="text-muted mb-0">
          Quản lý thông tin cá nhân và thông tin tài khoản của bạn.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <PatientProfileForm profile={profile} onUpdated={updateProfile} />
        </div>

        <div className="col-lg-4">
          <PatientAccountForm profile={profile} />
        </div>
      </div>
    </div>
  );
}
