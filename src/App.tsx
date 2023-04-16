import { useState } from "react";
import Input from "./components/Input";
import { IoIosArrowDropdown } from "react-icons/io";
import Display from "./components/Display";
import moment from "moment";

const FIELD_REQUIRED_MSG = "This field is required";
const CURRENT_DATE = moment();

interface InputProps {
  value: number | undefined;
  error: string | undefined;
}

interface Age {
  years: number | undefined;
  months: number | undefined;
  days: number | undefined;
}

function App() {
  const [isError, setIsError] = useState(false);
  const [age, setAge] = useState<Age>({
    years: undefined,
    months: undefined,
    days: undefined,
  });
  const [day, setDay] = useState<InputProps>({
    value: undefined,
    error: undefined,
  });
  const [month, setMonth] = useState<InputProps>({
    value: undefined,
    error: undefined,
  });
  const [year, setYear] = useState<InputProps>({
    value: undefined,
    error: undefined,
  });

  const calculateAge = (date: moment.Moment) => {
    const diff = CURRENT_DATE.diff(date);
    const duration = moment.duration(diff);
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    setAge({ years, months, days });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsError(false);
    setDay((prev) => ({ ...prev, error: undefined }));
    setMonth((prev) => ({ ...prev, error: undefined }));
    setYear((prev) => ({ ...prev, error: undefined }));

    if (!day.value) {
      setDay((prev) => ({ ...prev, error: FIELD_REQUIRED_MSG }));
      setIsError(true);
      return;
    }
    if (!month.value) {
      setMonth((prev) => ({ ...prev, error: FIELD_REQUIRED_MSG }));
      setIsError(true);
      return;
    }
    if (!year.value) {
      setYear((prev) => ({ ...prev, error: FIELD_REQUIRED_MSG }));
      setIsError(true);
      return;
    }
    if (day.value && (day.value < 1 || day.value > 31)) {
      setDay((prev) => ({ ...prev, error: "Must be a valid day" }));
      setIsError(true);
      return;
    }
    if (month.value && (month.value < 1 || month.value > 12)) {
      setMonth((prev) => ({ ...prev, error: "Must be a valid month" }));
      setIsError(true);
      return;
    }
    if (year.value && year.value > CURRENT_DATE.year()) {
      setYear((prev) => ({ ...prev, error: "Must be in the past" }));
      setIsError(true);
      return;
    }
    const date = moment(
      `${year.value}-${month.value}-${day.value}`,
      "YYYY-M-D",
      true
    );
    if (!date.isValid() || date > CURRENT_DATE) {
      setIsError(true);
      setYear((prev) => ({ ...prev, error: "Must be a valid date" }));
      return;
    }

    if (!isError) {
      calculateAge(date);
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-200 flex justify-center items-center">
      <div className="w-full md:w-fit mx-4 md:mx-0 bg-white h-fit py-6 px-4 rounded-3xl rounded-br-[150px]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-4 ">
            <Input
              label="DAY"
              error={day.error}
              options={{
                name: "day",
                id: "day",
                placeholder: "DD",
                type: "number",
                min: 1,
                max: 31,
                value: day.value ?? "",
                onChange: (e) =>
                  setDay((prev) => ({
                    ...prev,
                    value: Number(e.target.value),
                  })),
              }}
            />
            <Input
              label="MONTH"
              error={month.error}
              options={{
                name: "month",
                id: "month",
                placeholder: "MM",
                type: "number",
                min: 1,
                max: 12,
                value: month.value ?? "",
                onChange: (e) =>
                  setMonth((prev) => ({
                    ...prev,
                    value: Number(e.target.value),
                  })),
              }}
            />
            <Input
              label="YEAR"
              error={year.error}
              options={{
                name: "year",
                id: "year",
                placeholder: "YYYY",
                type: "number",
                max: CURRENT_DATE.year(),
                value: year.value ?? "",
                onChange: (e) =>
                  setYear((prev) => ({
                    ...prev,
                    value: Number(e.target.value),
                  })),
              }}
            />
          </div>
          <div className="flex flex-row items-center relative">
            <hr className="w-full md:w-[400px] my-[64px] md:my-0" />
            <button
              type="submit"
              className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:static rounded-full bg-purple-700 hover:bg-black flex items-center justify-center w-[64px] h-[64px] text-white p-4 text-xl"
            >
              <IoIosArrowDropdown size={48} />
            </button>
          </div>
        </form>
        <div>
          <Display value={age.years} label="years" />
          <Display value={age.months} label="months" />
          <Display value={age.days} label="days" />
        </div>
      </div>
    </div>
  );
}

export default App;
