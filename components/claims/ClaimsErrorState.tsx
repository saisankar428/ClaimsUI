import { Button, Result } from "antd";

type Props = {
  message: string;
  onRetry: () => void;
};

export default function ClaimsErrorState({ message, onRetry }: Props) {
  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle={message}
      extra={
        <Button type="primary" onClick={onRetry}>
          Try again
        </Button>
      }
      style={{ padding: "64px 24px" }}
    />
  );
}
