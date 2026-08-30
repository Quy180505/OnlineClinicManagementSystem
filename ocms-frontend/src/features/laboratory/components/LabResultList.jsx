import LabResultItem from "./LabResultItem";

export default function LabResultList({ results = [] }) {
  if (!results.length) {
    return (
      <div className="text-muted text-center py-4">
        Chưa có kết quả xét nghiệm.
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {results.map((result) => (
        <LabResultItem key={result.id} result={result} />
      ))}
    </div>
  );
}
