import { useCallback, useState } from "react";

const createInitialForm = (doctorSchedule) => ({
  doctorId: doctorSchedule?.doctorId ?? "",
  workDate: doctorSchedule?.workDate || "",
  startTime: doctorSchedule?.startTime? doctorSchedule.startTime.slice(0, 5) : "",
  endTime: doctorSchedule?.endTime ? doctorSchedule.endTime.slice(0, 5) : "",
  maxPatients: doctorSchedule?.maxPatients ?? "",
});

export default function useDoctorScheduleForm(doctorSchedule) {
  const [form, setForm] = useState(() => createInitialForm(doctorSchedule));

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setForm((previous) => ({ ...previous,[name]: value,}));}, []);

  const getSubmitData = useCallback(() => {
    const data = {
      workDate: form.workDate,
      startTime: form.startTime,
      endTime: form.endTime,
      maxPatients: Number(form.maxPatients),
    };

    if (!doctorSchedule) {
      data.doctorId = Number(form.doctorId);
    }

    return data;}, [form, doctorSchedule]);

  return { form,handleChange,getSubmitData, };
}
