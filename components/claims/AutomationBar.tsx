import { Progress } from "antd";

export default function AutomationBar({ value }: { value: number }) {
  return (
    <Progress
      percent={value}
      showInfo={false}
      size={{ height: 8 }}
      strokeColor="#bfdbfe"
      trailColor="#fed7aa"
      style={{ margin: 0 }}
    />
  );
}
