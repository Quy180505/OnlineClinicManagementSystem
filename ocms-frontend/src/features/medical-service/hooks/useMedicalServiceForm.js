import { useCallback, useState } from "react";

const createInitialForm = (medicalService) => ({
  specialtyId: medicalService?.specialtyId
    ? String(medicalService.specialtyId)
    : "",

  serviceName: medicalService?.serviceName || "",

  serviceType: medicalService?.serviceType || "",

  price:
    medicalService?.price !== undefined && medicalService?.price !== null
      ? String(medicalService.price)
      : "",

  description: medicalService?.description || "",
});

export default function useMedicalServiceForm(medicalService) {
  const [form, setForm] = useState(() => createInitialForm(medicalService));

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }, []);

  const getSubmitData = useCallback(
    () => ({
      specialtyId: Number(form.specialtyId),
      serviceName: form.serviceName.trim(),
      serviceType: form.serviceType,
      price: Number(form.price),
      description: form.description.trim(),
    }),
    [form],
  );

  return {
    form,
    handleChange,
    getSubmitData,
  };
}
