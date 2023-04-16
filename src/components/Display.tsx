interface DisplayProps {
  value: number | undefined;
  label: string;
}

const Display = ({ value, label }: DisplayProps) => {
  return (
    <div className="flex flex-row gap-2 text-7xl font-bold">
      <p className="text-purple-700">{value ?? "--"}</p>
      <p>{label}</p>
    </div>
  );
};

export default Display;
