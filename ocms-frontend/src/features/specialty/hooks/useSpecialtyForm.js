import { useCallback, useState } from "react";

const createInitialForm = (specialty) => ({
  name: specialty?.name || "",
  description: specialty?.description || "",
});

export default function useSpecialtyForm(specialty) {
  const [form, setForm] = useState(() => createInitialForm(specialty));

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }, []);

  const getSubmitData = useCallback(
    () => ({
      name: form.name.trim(),
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
