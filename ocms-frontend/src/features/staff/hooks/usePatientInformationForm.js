import { useCallback, useState } from "react";

const createInitialForm = (patient) => ({
  fullName: patient?.fullName || "",
  phone: patient?.phone || "",
  dateOfBirth: patient?.dateOfBirth || "",
  gender: patient?.gender || "",
  citizenId: patient?.citizenId || "",
  address: patient?.address || "",
  emergencyContact: patient?.emergencyContact || "",
});

export default function usePatientInformationForm(patient) {
  const [form, setForm] = useState(() => createInitialForm(patient));

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }, []);

  const getSubmitData = useCallback(
    () => ({
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      dateOfBirth: form.dateOfBirth || null,
      gender: form.gender || null,
      citizenId: form.citizenId.trim(),
      address: form.address.trim(),
      emergencyContact: form.emergencyContact.trim(),
    }),
    [form],
  );

  return {
    form,
    handleChange,
    getSubmitData,
  };
}
