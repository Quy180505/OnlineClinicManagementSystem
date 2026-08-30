import { useState } from "react";
import useLabResult from "../../hooks/useLabResult";

export default function LabResultForm({testOrderDetail,onSaved, onCancel}) {
  const [resultContent, setResultContent] = useState("");

  const {saving,error,updateLabResult,clearError} = useLabResult();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!testOrderDetail?.id) {
      return;
    }

    if (!resultContent.trim()) {
      return;
    }

    clearError();

    const result = await updateLabResult(
      testOrderDetail.id,
      resultContent.trim(),
    );

    if (result) {
      if (onSaved) {
        await onSaved(result);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Xét nghiệm
        </label>

        <input
          type="text"
          className="form-control"
          value={testOrderDetail?.serviceName || ""}
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Kết quả
        </label>

        <textarea
          className="form-control"
          rows="6"
          value={resultContent}
          onChange={(event) =>setResultContent(event.target.value)}
          placeholder="Nhập kết quả xét nghiệm..."
          disabled={saving}
        />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
          disabled={saving}
        >
          Hủy
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={saving || !resultContent.trim()}
        >
          {saving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Đang lưu...
            </>
          ) : (
            "Lưu kết quả"
          )}
        </button>
      </div>
    </form>
  );
}